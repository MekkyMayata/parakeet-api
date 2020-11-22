/**
 * @description - throws error on registration fail
 */
class RegistrationError extends Error {
  constructor(msg) {
    super();
    this.message = msg || 'Currently unable to register user.';
    this.name = 'Registration Error';
    this.code = 1001;
    this.data = {};
  }
}

export default RegistrationError;