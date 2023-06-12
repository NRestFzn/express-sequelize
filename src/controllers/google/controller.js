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
  const { code, register } = req.query

  const googleToken = await ServiceGoogle.getGoogleOAuthTokens(code, register)

  const googleUser = await ServiceGoogle.getGoogleUser(
    googleToken.id_token,
    googleToken.access_token
  )
  let data = await user.findOne({
    where: {
      email: googleUser.email,
    },
  })
  if (register && !data) {
    data = await user.create({
      fullname: googleUser.name,
      email: googleUser.email,
      image: googleUser.picture,
      registerWith: 'google',
    })
  }

  if (!data) {
    return res.json({ Message: 'user not found. ' })
  }
  const payload = { data }
  const token = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: '7d',
  })
  res.json({
    message: 'success',
    token,
  })
})
