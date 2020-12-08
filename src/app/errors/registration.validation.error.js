/**
 * @description - throws error on registration validation fail
 */
class RegistrationValidationError extends Error {
  constructor(data) {
    super();
    this.message = 'Invalid Input Fields';
    this.name = 'Registration Validation Error';
    this.code = 1000;
    this.data = data;
  }
}

export default RegistrationValidationError;