const CustomAPIError = require('./custom-error-api');
const UNAUTHENTICATED = require('./unauthenticated');
const NOT_FOUND_ERROR = require('./not-found');
const BAD_REQUEST = require('./bad-request');
const UNAUTHORIZED = require('./unauthorized');


module.exports = {
  CustomAPIError,
  UNAUTHENTICATED,
  NOT_FOUND_ERROR,
  BAD_REQUEST,
  UNAUTHORIZED
}