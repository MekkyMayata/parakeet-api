import joi from '@hapi/joi';
import constants from '../../config/constants';
import formatError from '../errors/utils/format.errors';
import LoginValidationError from '../errors/login.validation.error';
import RegistrationValidationError from '../errors/registration.validation.error';
import PasswordResetValidationError from '../errors/password.reset.validation.error';
import ImageValidationError from '../errors/post.validation.error';

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
       telephone: joi.string().min(10).max(15).required(),
       gender: joi.string().required(),
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
   

   static validatePasswordResetCredentials(fields) {
     const schema = joi.object({
       token: joi.string().required(),
       password: joi.string().min(6).required(),
       confirm_password: joi.any().valid(joi.ref('password')).required()
     }).options({ abortEarly: false });

     const result = schema.validate(fields);
     if (result.error) {
       const error = formatError(result.error.details);
       throw new PasswordResetValidationError(error);
     }
     return fields;
   }

  static validateImagePost(fields) {
    const schema = joi.object({
      post_path: joi.string().uri().required(),
      post_caption: joi.string(),
      post_latitude: joi.number(),
      post_longitude: joi.number()
    }).options({ abortEarly: false });

    const result = schema.validate(fields);
    if (result.error) {
      const error = formatError(result.error.details);
      throw new ImageValidationError(error);
    }
    return fields;
  }
}

export default Validator;
