/**
 * @description - throws error on password reset fail
 */
class PasswordResetError extends Error {
  constructor(msg) {
    super();
    this.message = msg || 'Currently unable to reset password.';
    this.name = 'Password Error';
    this.code = 1005;
    this.data = {};
  }
}

export default PasswordResetError;
