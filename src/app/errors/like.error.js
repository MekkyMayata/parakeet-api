/**
 * @description - throws an error on like post fail
 */
class LikeError extends Error {
  constructor(msg) {
    super()
    this.message = msg || 'Currently unable to like post';
    this.name = 'Like Error',
    this.code = 1009;
    this.data = {}
  }
}

export default LikeError;
