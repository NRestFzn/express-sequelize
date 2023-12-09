const RoleService = require('./service')
const router = require('../../routes/v1')
const asyncHandler = require('../../helpers/asyncHandler')
const HttpResponse = require('../../modules/response/HttpResponse')

router.get(
  '/role',
  asyncHandler(async (req, res) => {
    const data = await RoleService.findAll(req)

    const httpResponse = HttpResponse.get(data)

    res.status(200).json(httpResponse)
  })
)

router.get(
  '/role/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const data = await RoleService.findById(id)

    const httpResponse = HttpResponse.get({ data })

    res.status(200).json(httpResponse)
  })
)

router.post(
  '/role',
  asyncHandler(async (req, res) => {
    const formData = req.body
    const data = await RoleService.create(formData)

    const httpResponse = HttpResponse.created({ data })

    res.status(200).json(httpResponse)
  })
)

router.put(
  '/role/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const formData = req.body

    await RoleService.update(id, formData)

    const httpResponse = HttpResponse.updated()

    res.status(200).json(httpResponse)
  })
)

router.delete(
  '/role/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params

    await RoleService.delete(id)

    const httpResponse = HttpResponse.deleted()

    res.status(200).json(httpResponse)
  })
)
