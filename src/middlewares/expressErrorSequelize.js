import { EmptyResultError, BaseError, ValidationError } from 'sequelize'
import { get } from 'lodash'

function msg(message) {
  return `Sequelize Error: ${message}`
}

async function ExpressErrorSequelize(err, req, res, next) {
  if (err instanceof BaseError) {
    if (err instanceof EmptyResultError) {
      return res.status(404).json({
        message: msg('Data not found'),
      })
    }

    if (err instanceof ValidationError) {
      console.log('ERROR SEQUELIZE VALIDATION!!!')
      const errors = get(err, 'errors', [])
      const errorMessage = get(errors, '0.message', null)

      const dataError = {
        message: errorMessage ? `${errorMessage}` : err.message,
        errors: errors.reduce((acc, curVal) => {
          acc[curVal.path] = curVal.message
          return acc
        }, {}),
      }

      console.log(dataError.message, dataError.errors)

      return res.status(400).json(dataError)
    }

    return res.status(500).json({
      message: msg(err.message),
    })
  }

  next(err)
}

module.exports = ExpressErrorSequelize
