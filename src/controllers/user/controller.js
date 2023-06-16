const models = require('../../database/models/index')
const router = require('../../router/v1')
const validator = require('../../middleware/validation')
const userSchema = require('./schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { user, activities } = models
const { SECRET_ACCESS_TOKEN } = process.env
const MainMiddleware = require('../../middleware/usermiddleware')
const upload = require('../../middleware/multer')
const AdminMiddleware = require('../../middleware/adminmiddleware')

router.get('/user', AdminMiddleware.EnsureTokenAdmin, async (req, res) => {
  const data = await user.findAll({})
  const total = await user.count({})
  res.status(200).json({ message: 'success', total, data })
})

router.get('/user/me', MainMiddleware.EnsureTokenPublic, async (req, res) => {
  const dbUser = req.user
  const data = await user.findOne({
    where: { id: dbUser.id },
  })
  res.status(200).json({ Message: 'success', data })
})

router.put(
  '/user/me/update',
  MainMiddleware.EnsureTokenPublic,
  async (req, res) => {
    const { username, fullname, email } = req.body
    const dbUser = req.user
    const data = await user.update(
      {
        username,
        fullname,
        email,
      },
      { where: { id: dbUser.id } }
    )
    res.status(200).json({ Message: 'user berhasil di update' })
  }
)

router.get('/user/:id', AdminMiddleware.EnsureTokenAdmin, async (req, res) => {
  const data = await user.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
  })
  if (!data) {
    return res.status(404).json({ Message: 'user not found' })
  }
  res.status(200).json({ Message: 'success', data })
})

router.post(
  '/user/register',
  validator(userSchema.registerSchema),
  async (req, res) => {
    const { username, fullname, email, password, confirmPassword } = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    const duplicateUser = await user.findOne({
      where: { [Op.and]: [{ username }, { email }] },
    })
    if (duplicateUser) {
      return res
        .status(302)
        .json({ Message: 'username atau email sudah tersedia' })
    }

    const data = await user.create({
      username,
      fullname,
      email,
      password: hashPassword,
      registerWith: 'form',
    })
    const createdMessage = 'akun berhasil dibuat'
    const payload = { data }
    const token = jwt.sign(payload, SECRET_ACCESS_TOKEN, {
      expiresIn: '7d',
    })
    res.status(201).json({ message: 'success', createdMessage, token })
  }
)

router.put('/user/update:id', async (req, res) => {
  const { username, fullname, email } = req.body
  const existingUser = await user.findOne({
    where: { id: req.params.id },
  })
  if (!existingUser) {
    return res.status(404).json({ Message: 'user not found' })
  }
  const data = await existingUser.update(
    { username, fullname, email },
    { where: { id: existingUser.id } }
  )
  res.status(200).json({ Message: 'user berhasil di update' })
})

router.put(
  '/user/upload-photo',
  MainMiddleware.EnsureTokenPublic,
  upload.single('image'),
  async (req, res) => {
    const file = req.file
    if (!file) {
      return res.status(302).json({ Message: 'harap upload photo' })
    }
    const data = await user.update(
      { image: file.path },
      { where: { id: req.user.id } }
    )
    res.status(200).json({ Message: 'photo berhasil di upload' })
  }
)

router.post('/login', validator(userSchema.loginSchema), async (req, res) => {
  const { username, password } = req.body
  const data = await user.findOne({
    where: { [Op.or]: [{ username }, { email: username }] },
  })
  if (!data) {
    return res.status(404).json({ Message: 'user not found' })
  }
  const isVerified = await bcrypt.compare(password, data.password)
  if (!isVerified) {
    return res.status(401).json({ Message: 'password salah!' })
  }
  const payload = { data }
  const token = jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: '7d',
  })
  res.status(200).json({ Message: 'success', token })
})

router.delete(
  '/user/softdelete/:id',
  AdminMiddleware.EnsureTokenAdmin,
  async (req, res) => {
    const data = await user.destroy({
      where: { id: req.params.id },
    })
    if (!data) {
      return res.status(404).json({ Message: 'user not found' })
    }
    res.status(200).json({ Message: 'user berhasil dihapus' })
  }
)

router.delete(
  '/user/forcedelete/:id',
  AdminMiddleware.EnsureTokenAdmin,
  async (req, res) => {
    const data = await user.destroy({
      where: { id: req.params.id },
      force: true,
    })
    if (!data) {
      return res.status(404).json({ Message: 'user not found' })
    }
    res.status(200).json({ Message: 'user berhasil dihapus' })
  }
)

router.put(
  '/user/restore/:id',
  AdminMiddleware.EnsureTokenAdmin,
  async (req, res) => {
    const data = await user.restore({
      where: { id: req.params.id },
    })
    if (!data) {
      return res.status(404).json({ Message: 'user not found' })
    }
    res.status(200).json({ Message: 'user berhasil di pulihkan' })
  }
)

router.get(
  '/my-linked/accounts',
  MainMiddleware.EnsureTokenPublic,
  async (req, res) => {
    const user = req.user
    const data = await models.linkedAccount.findAll({
      where: { userId: user.id },
    })
    res.status(200).json({ Message: 'success', data })
  }
)
