const models = require('../../database/models/index')
const { user } = models
const router = require('../../router/v1')

router.get('/findAll', async (req, res) => {
  const data = await user.findAll({})
  res.status(200).json({ message: 'success', data })
})
