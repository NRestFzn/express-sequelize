import jwt from 'jsonwebtoken'
import models from 'database/models/index'
import env from 'config/env.config'

const { User } = models

async function authorization(req, res, next) {
  const { authorization } = req.headers
  if (authorization) {
    jwt.verify(
      authorization,
      env.JWT_SECRET_ACCESS_TOKEN,
      async (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: err.message })
          } else {
            return res.status(401).json({ message: err.message })
          }
        } else {
          if (decoded) {
            const dbUser = await User.scope('withPassword').findOne({
              where: { id: decoded.id },
            })
            if (!dbUser) {
              return res
                .status(403)
                .json({ message: 'Illegal access, user not found' })
            } else if (isPasswordChanged(decoded, dbUser)) {
              return res.status(403).json({
                message: 'password changed, please login and try again',
              })
            }
            req.user = dbUser
            next()
          } else {
            return res.status(403).json({ message: 'Invalid token format' })
          }
        }
      }
    )
  } else {
    return res.status(403).json({ message: 'Please login or register first' })
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
}

module.exports = authorization
