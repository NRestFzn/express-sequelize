class BaseResponse extends Error {
  statusCode

  constructor(message, statusCode = 500) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    Object.setPrototypeOf(this, BaseResponse.prototype)
  }
}

module.exports = BaseResponse
