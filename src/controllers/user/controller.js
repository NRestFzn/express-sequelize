const UserService = require('./service')
const router = require('../../routes/v1')
const asyncHandler = require('../../helpers/asyncHandler')
const HttpResponse = require('../../modules/response/HttpResponse')

router.get(
  '/users',
  asyncHandler(async (req, res) => {
    const data = await UserService.findAll(req)

    const httpResponse = HttpResponse.get(data)

    res.status(200).json(httpResponse)
  })
)

router.get(
  '/user/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const data = await UserService.findById(id)

    const httpResponse = HttpResponse.get({ data })

    res.status(200).json(httpResponse)
  })
)

router.post(
  '/user',
  asyncHandler(async (req, res) => {
    const formData = req.body
    const data = await UserService.create(formData)

    const httpResponse = HttpResponse.created({ data })

    res.status(200).json(httpResponse)
  })
)

router.put(
  '/user/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const formData = req.body

    await UserService.update(id, formData)

    const httpResponse = HttpResponse.updated()

    res.status(200).json(httpResponse)
  })
)
