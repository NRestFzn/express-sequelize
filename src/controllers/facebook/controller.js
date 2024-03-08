import jwt from 'jsonwebtoken'
import routes from 'routes/v1'
import env from 'config/env.config'
import db from 'database/data-source'
import ServiceFacebook from './service'
import RoleId from 'constants/ConstRole'
import models from 'database/models/index'
import asyncHandler from 'helpers/asyncHandler'
import ResponseError from 'modules/response/ResponseError'

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
