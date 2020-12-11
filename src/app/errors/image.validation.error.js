/**
 * @description - throws error on image validation fail
 */
class ImageValidationError extends Error {
  constructor(data) {
    super();
    this.message = 'Invalid Input Fields';
    this.name = 'Image Validation Error';
    this.code = 1005;
    this.data = data;
  }
}

export default ImageValidationError;