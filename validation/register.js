const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(bodyData) {
  const errors = {};
  const data = bodyData;

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (
    !Validator.isLength(data.name, {
      min: 2,
      max: 30,
    })
  ) {
    errors.name = 'Name must be between 2 and 30 characters.';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required.';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required.';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'The password is required.';
  }
  if (
    !Validator.isLength(data.password, {
      min: 6,
      max: 30,
    })
  ) {
    errors.password = 'The password must be at least 6 characters.';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
