/**
 * @description - throws error on login validation fail
 */
class LoginValidationError extends Error {
  constructor(data) {
    super();
    this.message = 'Invalid Input Fields';
    this.name = 'Login Validation Error';
    this.code = 1002;
    this.data = data;
  }
}

export default LoginValidationError;
