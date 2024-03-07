const AuthService = require('./service')
const router = require('../../routes/v1')
const asyncHandler = require('../../helpers/asyncHandler')
const RoleId = require('../../constants/ConstRole')

router.post(
  '/login',
  asyncHandler(async function login(req, res) {
    const formData = req.body

    const data = await AuthService.login(formData)

    res.status(200).json(data)
  })
)

router.post(
  '/register',
  asyncHandler(async function register(req, res) {
    const formData = req.body

    const data = await AuthService.register({
      ...formData,
      RoleId: RoleId.USER,
    })

    res.status(200).json(data)
  })
)
