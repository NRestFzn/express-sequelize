const BaseResponse = require('../errors/BaseResponse')

class BadRequest extends BaseResponse {
  constructor(message) {
    super(message, 400)
    Object.setPrototypeOf(this, BadRequest.prototype)
  }
}

class Forbidden extends BaseResponse {
  constructor(message) {
    super(message, 403)
    Object.setPrototypeOf(this, Forbidden.prototype)
  }
}

class InternalServer extends BaseResponse {
  constructor(message) {
    super(message, 500)
    Object.setPrototypeOf(this, InternalServer.prototype)
  }
}

class NotFound extends BaseResponse {
  constructor(message) {
    super(message, 404)
    Object.setPrototypeOf(this, NotFound.prototype)
  }
}

class Unauthorized extends BaseResponse {
  constructor(message) {
    super(message, 401)
    Object.setPrototypeOf(this, Unauthorized.prototype)
  }
}

const ResponseError = {
  BadRequest,
  BaseResponse,
  Forbidden,
  InternalServer,
  NotFound,
  Unauthorized,
}

module.exports = ResponseError
