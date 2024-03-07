const authSchema = require('./schema')
const { compareSync } = require('bcrypt')
const models = require('../../database/models')
const ResponseError = require('../../modules/response/ResponseError')
const jwt = require('jsonwebtoken')
const env = require('../../config/env.config')
const { User } = models
const db = require('../../database/data-source')

class AuthService {
  constructor() {}
  static async login(formData) {
    const value = authSchema.login.validateSync(formData)
    const user = await User.scope('withPassword').findOne({
      where: { email: value.email },
    })
    if (!user) throw new ResponseError.NotFound('User not found')

    const matchPassword = compareSync(value.password, user.password)

    if (!matchPassword)
      throw new ResponseError.Unauthorized('Incorrect email or password')

    const token = jwt.sign(user.dataValues, env.JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: env.JWT_ACCESS_TOKEN_EXPIRED,
    })

    return {
      message: 'success',
      token,
      fullname: user.fullname,
      userId: user.id,
    }
  }

  static async register(formData) {
    const value = authSchema.register.validateSync(formData)

    const trx = await db.sequelize.transaction()

    const data = await User.create({ ...value }, { transaction: trx })

    await trx.commit()

    return data
  }
}

module.exports = AuthService
