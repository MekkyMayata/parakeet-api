
/**
 * @description - throws an error on user follow fail
 */
class FollowError extends Error {
  constructor(msg) {
    super()
    this.message = msg || 'Currently unable to follow user';
    this.name = 'Follow Error';
    this.code = '1008';
    this.data = {};
  }
}

export default FollowError;
