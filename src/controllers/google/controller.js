const routes = require('../../router/v1')
const ServiceGoogle = require('./service')
const models = require('../../database/models/')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const MainMiddleware = require('../../middleware/usermiddleware')
const { user } = models
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID)

routes.get('/auth/google', async (req, res) => {
  const code = req.query.code
  const register = req.query.register
  let redirect_uri = process.env.GOOGLE_OAUTH_LOGIN_URL
  if (register) {
    redirect_uri = process.env.GOOGLE_OAUTH_REGISTER_URL
  }
  const googleToken = await ServiceGoogle.getGoogleOAuthTokens(
    redirect_uri,
    code
  )

  const googleUser = await ServiceGoogle.getGoogleUser(
    googleToken.id_token,
    googleToken.access_token
  )

  let data = await models.user.findOne({
    where: {
      [Op.or]: [{ email: googleUser.email }, { googleId: googleUser.sub }],
    },
  })

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

routes.post(
  '/auth/google/sync',
  MainMiddleware.EnsureTokenPublic,
  async (req, res) => {
    const code = req.query.code
    const sync = req.query.sync
    const user = req.user
    let redirect_uri = process.env.GOOGLE_OAUTH_LOGIN_URL
    if (sync) {
      redirect_uri = process.env.GOOGLE_OAUTH_SYNC_URL
    }
    const googleToken = await ServiceGoogle.getGoogleOAuthTokens(
      redirect_uri,
      code
    )
    const googleUser = await ServiceGoogle.getGoogleUser(
      googleToken.id_token,
      googleToken.access_token
    )

    if (user.googleId) {
      return res.json({ Message: 'Akun sudah terhubung dengan google. ' })
    }

    if (googleUser.email === user.email && user.registerWith === 'google') {
      return res.json({ Message: 'Email ini sudah  digunakan. ' })
    }

    const linkedAccount = await models.linkedAccount.findOne({
      where: {
        [Op.and]: [{ email: googleUser.email }, { type: 'google' }],
      },
    })

    if (linkedAccount) {
      return res.json({ Message: 'akun ini sudah digunakan. ' })
    }

    const updateGoogleId = await models.user.update(
      { googleId: googleUser.sub },
      { where: { id: user.id } }
    )

    const bindAccount = await models.linkedAccount.create({
      userId: user.id,
      name: googleUser.name,
      email: googleUser.email,
      image: googleUser.picture,
      type: 'google',
    })

    return res.json({
      Message: 'Menghubungkan akun berhasil. ',
    })
  }
)
