const { StatusCodes} = require('http-status-codes');
const CUSTOM_ERROR = require('./custom-error-api');

class BAD_REQUEST extends CUSTOM_ERROR{
  constructor(message){
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BAD_REQUEST
