const routes = require('../../router/v1')
const ServiceGoogle = require('./service')
const models = require('../../database/models/')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const MainMiddleware = require('../../middleware/usermiddleware')
const { user, linkedAccount } = models
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID)

routes.get('/auth/google', async (req, res) => {
  const { code, register, sync } = req.query
  let redirect_uri
  if (register) {
    redirect_uri = process.env.GOOGLE_OAUTH_REGISTER_URL
  } else if (sync) {
    redirect_uri = process.env.GOOGLE_OAUTH_SYNC_URL
  } else {
    redirect_uri = process.env.GOOGLE_OAUTH_LOGIN_URL
  }
  const { access_token, id_token } = await ServiceGoogle.getGoogleOAuthTokens(
    code,
    redirect_uri
  )
  const googleUser = await ServiceGoogle.getGoogleUser(id_token, access_token)
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
  })
  const googlePayload = ticket.getPayload()
  const googleUserId = googlePayload.sub
  let dbUser = await user.findOne({
    where: {
      [Op.or]: {
        email: googleUser.email,
        googleId: googleUserId,
      },
    },
  })

  if (register && !dbUser) {
    dbUser = await user.create({
      fullname: googleUser.name,
      email: googleUser.email,
      image: googleUser.picture,
      registerWith: 'google',
    })
  }

  if (!dbUser) {
    return res.json({ Message: 'user not found. ' })
  }
  const payload = { dbUser }
  const token = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: '7d',
  })
  res.json({
    message: 'success',
    token,
  })
})
