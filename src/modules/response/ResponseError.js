const BadRequest = require('../errors/BadRequest')
const BaseResponse = require('../errors/BaseResponse')
const Forbidden = require('../errors/Forbidden')
const InternalServer = require('../errors/InternalServer')
const NotFound = require('../errors/NotFound')
const Unauthorized = require('../errors/Unauthorized')

const ResponseError = {
  BadRequest,
  BaseResponse,
  Forbidden,
  InternalServer,
  NotFound,
  Unauthorized,
}

module.exports = ResponseError
