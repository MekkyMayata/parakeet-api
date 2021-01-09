/**
 * @description - throws error on post validation fail
 */
class PostValidationError extends Error {
  constructor(data) {
    super();
    this.message = 'Invalid Input Fields';
    this.name = 'Post Validation Error';
    this.code = 1006;
    this.data = data;
  }
}

export default PostValidationError;