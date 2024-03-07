const jwt = require('jsonwebtoken')
const routes = require('../../routes/v1')
const ServiceFacebook = require('./service')
const env = require('../../config/env.config')
const db = require('../../database/data-source')
const RoleId = require('../../constants/ConstRole')
const models = require('../../database/models/index')
const asyncHandler = require('../../helpers/asyncHandler')
const ResponseError = require('../../modules/response/ResponseError')

routes.get(
  '/auth/facebook',
  asyncHandler(async (req, res, next) => {
    const { access_token, register } = req.query

    const trx = await db.sequelize.transaction()

    const appAccessToken = await ServiceFacebook.getFacebookOAuthAccess()

    //get user with tokens
    const validateUserToken = await ServiceFacebook.validateUserAccessToken(
      access_token,
      appAccessToken?.access_token
    )
    const facebookUser = await ServiceFacebook.getUserData(
      validateUserToken?.data?.user_id,
      access_token
    )

    let data = await models.User.findOne({
      where: {
        email: facebookUser.email,
      },
    })

    if (register && !data) {
      data = await models.User.create(
        {
          fullname: facebookUser.name,
          email: facebookUser.email,
          RoleId: RoleId.USER,
          password: env.JWT_SECRET_ACCESS_TOKEN,
          // avatar: facebookUser.picture.data.url,
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
