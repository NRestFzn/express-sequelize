const jwt = require('jsonwebtoken')
const { user } = require('../database/models')
const { SECRET_ACCESS_TOKEN } = process.env

const EnsureTokenAdmin = (req, res, next) => {
  const tokenAdmin = req.headers.tokenadmin
  if (tokenAdmin) {
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
              .json({ Message: 'Illegal access! user not found.' })
          } else if (isPasswordChanged(data, dbUser)) {
            return res.status(403).json({
              message: 'Password telah diubah, silahkan login kembali.',
            })
          }

          if (data.role !== 'admin') {
            return res
              .status(403)
              .json({ Message: 'Illesgal access! role bukan admin.' })
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

function isPasswordChanged(decoded, dbUser) {
  let reqUser = decoded.user
  if (reqUser && dbUser) {
    let curUser = dbUser.dataValues
    if (reqUser.password !== curUser.password) {
      return true
    }
  }
  return false
}

const MainMiddleware = {
  EnsureTokenAdmin,
}

module.exports = MainMiddleware
