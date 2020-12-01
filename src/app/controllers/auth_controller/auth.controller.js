import moment from 'moment';
import constants from '../../../config/constants';
import Validator from '../../utils/validator';
import UserService from '../../services/user.service';
import RegistrationError from '../../errors/registration.error';
import { bcryptSaltPassword } from './auth.utils';
import logger from '../../../config/logger';

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

      // exclude user secrets
      const { user: newUser } = result;
      delete newUser.password;
      delete newUser.salt;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Registration success!',
        status: 200,
        data: newUser
      });
    } catch (err) {
      logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}]`, 'Error: AuthController error', err);
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