const { StatusCodes } = require('http-status-codes');
const CUSTOM_ERROR = require ('./custom-error-api');

class UNAUTHENTICATED extends CUSTOM_ERROR {
  constructor(message){
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}
module.exports = UNAUTHENTICATED