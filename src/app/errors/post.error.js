/**
 * @description - throws an error on image post fail
 */
class PostError extends Error {
  constructor(msg) {
    super()
    this.message = msg || 'Currently unable to post image';
    this.name = 'Post Error',
    this.code = 1007;
    this.data = {}
  }
}

export default PostError;