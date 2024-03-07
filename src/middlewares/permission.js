const { User } = require('../database/models')
const { green } = require('colorette')

function permissionAccess(roles) {
  return async (req, res, next) => {
    const userLogin = req.user
    const getUser = await User.findOne({
      where: { id: userLogin.id },
    })

    const errType = `not permitted access error:`
    const errMessage = 'you are not allowed'

    if (getUser && !roles.includes(getUser.RoleId)) {
      // log error
      const msgType = green('permission')
      console.log(`${msgType} - ${errType} ${errMessage}`)

      return res.status(403).json({
        code: 403,
        message: `${errType} ${errMessage}`,
      })
    }

    next()
  }
}

module.exports = permissionAccess
