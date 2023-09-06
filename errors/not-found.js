const { StatusCodes } = require('http-status-codes');
const CUSTOM_ERROR = require('./custom-error-api');
// const { model } = require('mongoose');

class NOT_FOUND_ERROR extends CUSTOM_ERROR{
  constructor(message){
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.export = NOT_FOUND_ERROR;