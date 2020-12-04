import moment from 'moment';
import constants from '../../../config/constants';
import Validator from '../../utils/validator';
import UserService from '../../services/user.service';
import RegistrationError from '../../errors/registration.error';
import { bcryptSaltPassword } from './auth.utils';
import LoginError from '../../errors/login.error';

const { ERROR } = constants;

class AuthController {

  /**
   * @description - register a new user
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async register(req,res) {
    try {
      let { body } = req;

      // validate input
      body = Validator.validateRegistration(body);
  

      // email verification
      const { email } = body;
      const emailVerificationResult = await UserService.fetchUserByEmail(email);
      if (!emailVerificationResult.success) { throw new RegistrationError(); }
      if(emailVerificationResult.user) { throw new RegistrationError('Email already exists'); }

      // handle password salting
      const { password } = body;
      const { salt, hash } = await bcryptSaltPassword(password);
      
      body.password = hash;
      body.salt = salt;

      // assign user id
      const idAssigned = await UserService.generateUserId();
      if (!idAssigned.success) { throw new RegistrationError(); }
      const { id: userId } = idAssigned;

      body.id = userId;

      // *******************how effective ?*************************
      // assign user category. Everybody starts in 'juno' category
      body.category = 'juno';

      const result = await UserService.CreateUser(body);
      if (!result.success) { throw new RegistrationError(); }

      // exclude irrelevant user records
      const { user: newUser, token } = result;
      delete newUser.password;
      delete newUser.salt;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Registration success!',
        status: 200,
        data: newUser,
        token
      });
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] AuthController error resulting from ${err}`);
      return res.status(400).json({
        current_url: req.originalUrl,
        success: false,
        message: err.message || ERROR,
        status: 400,
        data: err.data || {},
        code: err.code
      });
    }
  }

  /**
   * @description logs in a user
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async login(req, res) {
    try {
      let { body } = req;

      // validate input
      body = Validator.validateLogin(body);

      const { email, password } = body;
      const userRecord = await UserService.fetchUserByEmail(email);
      if (!userRecord.success) { throw new LoginError(); }
      if (userRecord.success && !userRecord.user) {
        throw new LoginError('Invalid username or password');
      }
      
      const passwordResult = await UserService.verifyPassword(userRecord.user, password);
      if (!passwordResult.success) { throw new LoginError(); }
      if (!passwordResult.valid) { throw new LoginError('Invalid username or password'); }

      const { user } = userRecord;
      delete user.salt;
      delete user.password;
      delete user.password_reset_token;
      delete user.password_reset_token_date;

      // generate auth token
      const tokenResult = await UserService.createUserToken(user);
      if (!tokenResult.success) { throw new LoginError(); }
      const { token } = tokenResult;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Successfully Logged in!',
        status: 200,
        data: { token, user }
      });
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] AuthController error resulting from ${err}`);
      return res.status(400).json({
        current_url: req.originalUrl,
        success: false,
        message: err.message ||  ERROR,
        status: 400,
        data: err.data || {},
        code: err.code
      });
    }
  }
}

export default AuthController;