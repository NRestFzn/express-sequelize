import routes from 'routes/v1'
import jwt from 'jsonwebtoken'
import env from '@config/env.config'
import ServiceGoogle from './service'
import db from '@database/data-source'
import RoleId from '@constants/ConstRole'
import models from '@database/models/index'
import asyncHandler from '@helpers/asyncHandler'
import ResponseError from '@modules/response/ResponseError'

routes.get(
  '/auth/google',
  asyncHandler(async (req, res) => {
    const code = req.query.code

    const register = req.query.register

    const txn = await db.sequelize.transaction()

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
        { transaction: txn }
      )
    }

    if (!data) {
      throw new ResponseError.NotFound('User not found')
    }

    const token = jwt.sign(data.dataValues, env.JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: env.JWT_ACCESS_TOKEN_EXPIRED,
    })

    await txn.commit()

    res.json({
      message: 'success',
      token,
    })
  })
)
