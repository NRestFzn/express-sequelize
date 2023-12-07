const Role = require('../../database/models/role')
const router = require('../../routes/index')
const RoleService = require('./service')

router.get('/roles', async (req, res) => {
  const { id } = req.params
  const data = await RoleService.getAllRole(req)
  res.json(data)
})

router.get('/role/:id', async (req, res) => {
  const { id } = req.params
  const data = await RoleService._findOne(id)
  res.json(data)
})
