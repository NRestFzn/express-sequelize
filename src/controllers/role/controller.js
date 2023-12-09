const asyncHandler = require('../../helpers/asyncHandler')
const ResponseError = require('../../modules/response/ResponseError')
const router = require('../../routes/v1')
const RoleService = require('./service')

router.get(
  '/role/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    await RoleService._findOne(id)
  })
)
