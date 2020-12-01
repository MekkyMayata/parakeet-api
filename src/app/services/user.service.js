import uudiv1 from 'uuid/v1';
import moment from 'moment';
import config from '../../config/index';
import User from '../models/user.model';
import constants from '../../config/constants';
import { decoder } from '../utils/encoder.decoder';
import PasswordResetError from '../errors/password.error';
import { validateHash, generateRandomString, generateJWTToken } from '../controllers/auth_controller/auth.utils';

const { MIN_ID_LENGTH } = constants;

class UserService {
  /**
   * @description create new user
   * @param { Object } data - obtained user details
   * @returns { Object } { success: true, user }
   */
  static async CreateUser(data) {
    try {
      const user = await User.createUser(data);
      return {
        success: true,
        user
      };
    } catch(err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description fetch user by email
   * @param { String } - obtained user email
   * @returns { Object } { sucess: true, user }
   */
  static async fetchUserByEmail(email) {
    try {
      const user = await User.findUserByEmail(email);
      return {
        success: true,
        user
      };
    } catch(err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description fetch user by id
   * @param { String } id - user id
   * @returns { Object } { success: true, user }
   */
  static async fetchUserById(id) {
    try {
      const user = await User.findUserById(id);
      return {
        success: true,
        user
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description create token for user login
   * @param { Object } user - obtained user details
   * @returns { Object } { success: true, token }
   */
  static async createUserToken(user) {
    try {
      const token = generateJWTToken(user);
      return {
        success: true,
        token
      };
    } catch(err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description create token for user password reset
   * @param { Object } user - user details
   * @returns { String } token 
   */
  static async createUserPasswordResetToken(user) {
    try {
      const { id } = user;
      const token = uudiv1();
      await User.saveUserPasswordResetToken(id, token);
      return {
        success: true,
        token
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description create unique user id
   * @returns { Object } { success: true, id }
   */
  static async generateUserId() {
    try {
      let id = generateRandomString(MIN_ID_LENGTH);
      let idExists = true;
      while (idExists) {
        idExists = await User.verifyUserId(id);
        if (idExists) {
          id = generateRandomString(MIN_ID_LENGTH);
        }
      }
      id = `USR-${id}`;
      return {
        success: true,
        id
      }  
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description - validate user password
   * @param { Object } user - user object
   * @param { String } password - supposed user password
   */
  static async verifyPassword(user, password) {
    try {
      const { password: passwordHash, salt } = user; // users hashed password
      const validatePassword = await validateHash(password, salt, passwordHash);
      return {
        success: true,
        valid: validatePassword
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description - verifies token is valid
   * @param { Object} user - user object
   * @returns { Boolean } true
   */
  static verifyTokenExpiry(user) {
    const { password_reset_token_date: passwordResetTokenDate } = user;
    const storedTime = moment(passwordResetTokenDate);
    const currentTime = moment();
    const dateDiff = currentTime.diff(storedTime, 'seconds');
    const expiryTime = (config.passwordResetTokenExpiresIn * 60 * 60);
    if (expiryTime > dateDiff) {
      return true  // still valid
    }
    return false
  }

  /**
   * @description - confirm validity of user password reset token
   * @param { String } token - supposed user token
   * @returns { Object } { success: true, user }
   */
  static async confirmUserPasswordToken(token) {
    try {
      const { token: decodedToken } = JSON.parse(decoder(token));
      const user = await User.findUserByToken(decodedToken);
      if (!user) { throw new Error('Invalid reset token provided'); }
      
      const tokenIsValid = this.verifyTokenExpiry(user);
      if (!tokenIsValid) { throw new Error('Token expired') }
      return {
        success: true,
        data: user
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description - update user password
   * @param { Object } data - user credentials
   * @returns { Object } { success: true, data: passwordUpdateResult.data }
   */
  static async updateUserPassword(data) {
    try {
      const { token } = data;
      const passwordUpdateResult = await this.confirmUserPasswordToken(token);
      if (!passwordUpdateResult.success) { throw new PasswordResetError('Token supplied is invalid'); }
      const { id } = passwordUpdateResult.data;
      data.userId = id;                       // attach the id to user object
      await User.updatePassword(data);
      return {
        success: true,
        data: passwordUpdateResult.data
      };
    } catch(err) {
      return {
        success: false,
        message: err.message
      };
    }
  }
}

export default UserService;