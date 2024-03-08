import _ from 'lodash'
import multer from 'multer'
const ResponseError = require('modules/response/ResponseError')

function generateErrorResponse(err, code) {
  return _.isObject(err.message) ? err.message : { code, message: err.message }
}
async function expressErrorResponse(err, _req, res, next) {
  // catch error from multer
  if (err instanceof multer.MulterError) {
    return res.status(400).json(generateErrorResponse(err, 400))
  }

  // catch from global error
  if (err instanceof ResponseError.BaseResponse) {
    return res
      .status(err.statusCode)
      .json(generateErrorResponse(err, err.statusCode))
  }

  next(err)
}

module.exports = expressErrorResponse
