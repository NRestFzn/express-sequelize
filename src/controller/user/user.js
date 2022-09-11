const models = require('../../database/models/index')
const router = require('../../router/v1')
const validator = require('../../middleware/validation')
const userSchema = require('./schema')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { user } = models

router.get('/user/findAll', async (req, res) => {
  const data = await user.findAll({})
  res.status(200).json({ message: 'success', data })
})

router.get('/user/:id', async (req, res) => {
  const data = await user.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
  })
  if (!data) {
    return res.status(404).json({ Message: 'user not found' })
  }
  res.status(200).json({ Message: 'success', data })
})

router.post('/user', validator(userSchema.registerSchema), async (req, res) => {
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
  if (password != confirmPassword) {
    return res.status(401).json({ Message: 'password tidak sama!' })
  }
  const data = await user.create({
    username,
    fullname,
    email,
    password: hashPassword,
  })
  const createdMessage = 'akun berhasil dibuat'
  res.status(201).json({ message: 'success', createdMessage })
})
