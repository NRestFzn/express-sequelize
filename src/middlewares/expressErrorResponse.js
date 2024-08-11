import _ from 'lodash'

const ResponseError = require('@modules/response/ResponseError')

function generateErrorResponse(err, code) {
  return _.isObject(err.message) ? err.message : { code, message: err.message }
}
async function expressErrorResponse(err, _req, res, next) {
  // catch from global error
  if (err instanceof ResponseError.BaseResponse) {
    return res
      .status(err.statusCode)
      .json(generateErrorResponse(err, err.statusCode))
  }

  // catch error from multer
  const errObj = generateErrorResponse(err, 500)
  if (err && errObj.message.includes('ENOENT')) {
    return res.status(500).json(errObj)
  }

  next(err)
}

module.exports = expressErrorResponse
