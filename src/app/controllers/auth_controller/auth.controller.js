import moment from 'moment';
import constants from '../../../config/constants';
import Validator from '../../utils/validator';
import UserService from '../../services/user.service';
import RegistrationError from '../../errors/registration.error';
import { bcryptSaltPassword } from './auth.utils';
import LoginError from '../../errors/login.error';
import PasswordResetError from '../../errors/password.error';
import { encoder } from '../../utils/encoder.decoder';
import sendgridMail from '../../lib/sendgrid.mail';
import twilioSMS from '../../lib/twilio.sms';
import config from '../../../config';

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

      // ***************fire badge function here*********************

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

  /**
   * @description process password reset and assign token
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async passwordReset(req, res) {
    try {
      let { body } = req;

      // validate input
      body = Validator.validatePasswordReset(body);
      const { email } = body;

      const userResult = await UserService.fetchUserByEmail(email);

      if (!userResult.success) { throw new PasswordResetError(); }

      if (!userResult.user) { throw new PasswordResetError(`We couldn't find an account with that email address`); }

      const { user } = userResult;

      // create user token
      const tokenValue = await UserService.createUserPasswordResetToken(user);
      if (!tokenValue.success) { throw new PasswordResetError(ERROR); }
      const { token } = tokenValue;

      const arg = { token };
      const argString = JSON.stringify(arg);
      const encryptedToken = encoder(argString);

      /**
       * *************************TODO**********************************
       * implement mail and sms here
       */
      const url = `${config.APP_URL}/r?token=${encryptedToken}`;
      const message = `Hello ${user.username}! Kindly click the link provided to reset your password: ${url}`;
      const options = {
        to: email,
        from: config.SENDER_EMAIL,
        subject: 'Password Reset on your leatspace account',
        text: message,
        html: message
      };
      await sendgridMail(options);

      // sms
      const { telephone: telephoneNumber } = user;
      await twilioSMS(message, telephoneNumber);

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Password reset token sent successfully!',
        status: 200,
        data: { done: 'true' }
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
   * @description - verify password reset token integrity 
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async confirmPasswordToken(req, res) {
    try {
      if (!(req.query && req.query.token)) { throw new PasswordResetError('Kindly provide a valid token'); }
      const { token } = req.query;
      
      // find the user
      const userPasswordTokenResult = await UserService.confirmUserPasswordToken(token);
      if (!userPasswordTokenResult.success) { throw new PasswordResetError('Token is invalid'); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Successfully verified password reset token',
        status: 200,
        data: { done: 'true' }
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
   * @description update user password
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async updatePassword(req, res) {
    try {
      let { body } = req;
      
      // validate input
      body = Validator.validatePasswordResetCredentials(body);

      const { password } = body;
      const { salt, hash } = await bcryptSaltPassword(password);
      
      body.salt = salt;
      body.password = hash;

      const updateResult = await UserService.updateUserPassword(body);
      if (!updateResult.success) { throw new Error(updateResult.message); }

      /** 
       *  ***********************TODO***************************
       * SETUP MAILING ON SUCCESS
      */
      const { email } = updateResult.data;

      const message = `Password update successful! You can now login with your new password`;
      const options = {
        to: email,
        from: config.SENDER_EMAIL,
        subject: 'Password Update',
        text: message,
        html: message
      };
      await sendgridMail(options);

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Password update success!',
        status: 200,
        data: { done: 'true' }
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
}

export default AuthController;