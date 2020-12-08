/**
 * @description - throws error on login fail
 */
class LoginError extends Error {
  constructor(msg) {
    super();
    this.message = msg || 'User currently unable to login.';
    this.name = 'Login Error';
    this.code = 1003;
    this.data 
    = {}
  }
}

export default LoginError;
