const jwt = require('jsonwebtoken')
const { user } = require('../database/models')
const { SECRET_ACCESS_TOKEN } = process.env

const EnsureTokenPublic = (req, res, next) => {
  const tokenPublic = req.headers.tokenpublic
  if (tokenPublic) {
    jwt.verify(tokenPublic, SECRET_ACCESS_TOKEN, async function (err, decoded) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ Message: 'Token expired' })
        } else {
          return res
            .status(401)
            .json({ Meessage: 'Failed to authenticate token' })
        }
      } else {
        if (decoded) {
          const data = decoded.data
          const dbUser = await user.findOne({
            where: { id: data.id },
          })
          if (!dbUser) {
            return res
              .status(404)
              .json({ Message: 'Illegal access! user not found!' })
          }
          req.user = dbUser
          next()
        }
      }
    })
  } else {
    return res.status(401).json({ Message: `Please login or Register first!` })
  }
}

const MainMiddleware = {
  EnsureTokenPublic,
}

module.exports = MainMiddleware
