const routes = require('../../router/v1')
const ServiceFacebook = require('./service')
const models = require('../../database/models')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const MainMiddleware = require('../../middleware/usermiddleware')

routes.get('/auth/facebook', async (req, res, next) => {
  const { access_token, register } = req.query

  const appAccessToken = await ServiceFacebook.getFacebookOAuthAccess()

  //   // get user with tokens
  const validateUserToken = await ServiceFacebook.validateUserAccessToken(
    access_token,
    appAccessToken?.access_token
  )
  const facebookUser = await ServiceFacebook.getUserData(
    validateUserToken?.data?.user_id,
    access_token
  )

  let data = await models.user.findOne({
    where: {
      [Op.or]: [{ email: facebookUser.email }, { facebookId: facebookUser.id }],
    },
  })

  if (register && !data) {
    data = await models.user.create({
      fullname: facebookUser.name,
      email: facebookUser.email,
      image: facebookUser.picture.data.url,
      registerWith: 'facebook',
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
  '/auth/facebook/sync',
  MainMiddleware.EnsureTokenPublic,
  async (req, res) => {
    const { access_token, sync } = req.query
    const user = req.user

    const appAccessToken = await ServiceFacebook.getFacebookOAuthAccess()

    //   // get user with tokens
    const validateUserToken = await ServiceFacebook.validateUserAccessToken(
      access_token,
      appAccessToken?.access_token
    )
    const facebookUser = await ServiceFacebook.getUserData(
      validateUserToken?.data?.user_id,
      access_token
    )

    if (user.facebookId) {
      return res.json({ Message: 'Akun sudah terhubung dengan google. ' })
    }

    if (facebookUser.email === user.email && user.registerWith === 'facebook') {
      return res.json({ Message: 'Akun ini sudah  terhubung ke facebook. ' })
    }

    const linkedAccount = await models.linkedAccount.findOne({
      where: {
        [Op.and]: [{ email: facebookUser.email }, { type: 'facebook' }],
      },
    })

    if (linkedAccount) {
      return res.json({ Message: 'akun ini sudah digunakan. ' })
    }

    const updatefacebookId = await models.user.update(
      { facebookId: facebookUser.id },
      { where: { id: user.id } }
    )

    const bindAccount = await models.linkedAccount.create({
      userId: user.id,
      name: facebookUser.name,
      email: facebookUser.email,
      image: facebookUser.picture.data.url,
      type: 'facebook',
    })

    return res.json({
      Message: 'Menghubungkan akun berhasil. ',
    })
  }
)
