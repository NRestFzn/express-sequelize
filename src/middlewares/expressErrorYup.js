import { ValidationError } from 'yup'

async function ExpressErrorYup(err, req, res, next) {
  if (err instanceof ValidationError) {
    const errType = `Yup Validation Error:`
    const message = err.errors.join('<br/>') || 'Yup Validation Error !'

    const error = {
      code: 422,
      message,
      errors:
        err.inner.length > 0
          ? err.inner.reduce((acc, curVal) => {
              acc[`${curVal.path}`] = curVal.message || curVal.type
              return acc
            }, {})
          : { [`${err.path}`]: err.message || err.type },
    }
    return res.status(422).json(error)
  }

  next(err)
}

module.exports = ExpressErrorYup
