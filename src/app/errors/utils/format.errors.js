/**
 * @description - Formats joi error messages to human-readable format.
 * @param { Array } errors - an array of error objects
 */
const formatError = (errors) => {
  const formattedError = {};
  errors.forEach((err) => {
    if (err.path.join('.') === 'confirm_password') {
      formattedError[err.path.join('.')] = 'Passwords do not match';
    } else {
      formattedError[err.path.join('.')] = err.message;
    }
  });
  return formattedError
};

export default formatError;