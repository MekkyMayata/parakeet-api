import joi from '@hapi/joi';
import constants from '../../config/constants';
import formatError from '../errors/utils/format.errors';
import LoginValidationError from '../errors/login.validation.error';
import RegistrationValidationError from '../errors/registration.validation.error';
import PasswordResetValidationError from '../errors/password.reset.validation.error';

// get the default user categories
const { USER_CATEGORIES } = constants;

class Validator {
  /**
   * @description - Validates user registration fields
   * @param { * } fields - Supplied by user
   * @returns fields either validated or failed
   */

   static validateRegistration(fields) {
     const schema = joi.object({
       name: joi.string().required(),
       username: joi.string().required(),
       email: joi.string().email().required(),
       telephone: joi.string().min(11).max(11).required(),
       gender: joi.string().min(1).max(1).required(),
       website: joi.string().uri(),
       bio: joi.string(),
       category: joi.string().valid(...USER_CATEGORIES).required(),
       password: joi.string().min(6).required(),
       confirm_password: joi.any().valid(joi.ref('password')).required()
     }).options({ abortEarly: false });

     const result = schema.validate(fields);

     if(result.error) {
       const error = formatError(result.error.details);
       throw new RegistrationValidationError(error);
     }

     return fields;
   }

   static validateLogin(fields) {
     const schema = joi.object({
       email: joi.string().email().required(),
       password: joi.string().min(6).required()
     }).options({ abortEarly: false });

     const result = schema.validate(fields);

     if(result.error) {
       const error = formatError(result.error.details);
       throw new LoginValidationError(error);
     }

     return fields;
   }
   
   static validatePasswordReset(fields) {
     const schema = joi.object({
       email: joi.string().email().required()
     }).options({ abortEarly: false })

     const result = schema.validate(fields);

     if(result.error) {
       const error = formatError(result.error.details);
       throw new PasswordResetValidationError(error);
     }

     return fields;
   }
}

export default Validator;
