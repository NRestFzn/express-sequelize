const routes = require('../../routes/v1')
const ServiceGoogle = require('./service')
const models = require('../../database/models/index')
const jwt = require('jsonwebtoken')
const env = require('../../config/env.config')
const db = require('../../database/data-source')
const RoleId = require('../../constants/ConstRole')
const asyncHandler = require('../../helpers/asyncHandler')
const ResponseError = require('../../modules/response/ResponseError')

routes.get(
  '/auth/google',
  asyncHandler(async (req, res) => {
    const code = req.query.code

    const register = req.query.register

    const trx = await db.sequelize.transaction()

    let redirect_uri = env.GOOGLE_OAUTH_LOGIN_URL

    if (register) {
      redirect_uri = env.GOOGLE_OAUTH_REGISTER_URL
    }

    const googleToken = await ServiceGoogle.getGoogleOAuthTokens(
      redirect_uri,
      code
    )

    const googleUser = await ServiceGoogle.getGoogleUser(
      googleToken.id_token,
      googleToken.access_token
    )

    let data = await models.User.findOne({
      where: { email: googleUser.email },
    })

    if (register && !data) {
      data = await models.User.create(
        {
          fullname: googleUser.name,
          email: googleUser.email,
          password: env.JWT_SECRET_ACCESS_TOKEN,
          RoleId: RoleId.USER,
          // avatar: googleUser.picture,
        },
        { transaction: trx }
      )
    }

    if (!data) {
      throw new ResponseError.NotFound('User not found')
    }

    const token = jwt.sign(data.dataValues, env.JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: env.JWT_ACCESS_TOKEN_EXPIRED,
    })

    await trx.commit()

    res.json({
      message: 'success',
      token,
    })
  })
)
