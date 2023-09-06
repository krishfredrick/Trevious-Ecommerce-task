const { StatusCodes} = require('http-status-codes');
const CUSTOM_ERROR = require ('./custom-error-api');

class UNAUTHORIZED extends CUSTOM_ERROR {
  constructor(message){
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
module.exports = UNAUTHORIZED;