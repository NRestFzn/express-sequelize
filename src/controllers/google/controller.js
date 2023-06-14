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
  const code = req.query.code
  const register = req.query.register
  const sync = req.query.sync
  if (register) {
    console.log('ngakses yang register')
  }
  const googleToken = await ServiceGoogle.getGoogleOAuthTokens(register, code)

  const googleUser = await ServiceGoogle.getGoogleUser(
    googleToken.id_token,
    googleToken.access_token
  )

  let data = await models.user.findOne({ where: { email: googleUser.email } })

  if (register && !data) {
    data = await models.user.create({
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
