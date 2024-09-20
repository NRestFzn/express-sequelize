import routes from '@routes/v1'
import userSchema from './schema'
import UserService from './service'
import RoleId from '@constants/ConstRole'
import asyncHandler from '@helpers/asyncHandler'
import permissions from '@middlewares/permission'
import authorization from '@middlewares/authorization'
import HttpResponse from '@modules/response/HttpResponse'

routes.get(
  '/user',
  authorization,
  permissions([RoleId.ADMIN]),
  asyncHandler(async (req, res) => {
    const data = await UserService.findAll(req)

    const httpResponse = HttpResponse.get(data)

    res.status(200).json(httpResponse)
  })
)

routes.get(
  '/user/:id',
  authorization,
  permissions([RoleId.ADMIN]),
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const data = await UserService.findById(id)

    const httpResponse = HttpResponse.get({ data })

    res.status(200).json(httpResponse)
  })
)

routes.post(
  '/user',
  authorization,
  permissions([RoleId.ADMIN]),
  asyncHandler(async (req, res) => {
    const formData = req.body
    const data = await UserService.create(formData)

    const httpResponse = HttpResponse.created({ data })

    res.status(200).json(httpResponse)
  })
)

routes.put(
  '/user/:id',
  authorization,
  permissions([RoleId.ADMIN]),
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const formData = req.body

    const txn = await req.transaction

    await UserService.update(id, formData, txn)

    const httpResponse = HttpResponse.updated()

    res.status(200).json(httpResponse)
  })
)

routes.put(
  '/user/change-password/:id',
  authorization,
  asyncHandler(async (req, res) => {
    const { id } = req.params

    const formData = req.body

    const txn = await req.transaction

    await UserService.changePassword(id, formData, txn)

    const httpResponse = HttpResponse.updated({})

    res.status(200).json(httpResponse)
  })
)

routes.delete(
  '/user/:id',
  authorization,
  permissions([RoleId.ADMIN]),
  asyncHandler(async (req, res) => {
    const { id } = req.params

    const txn = await req.transaction

    await UserService.delete(id, txn)

    const httpResponse = HttpResponse.deleted()

    res.status(200).json(httpResponse)
  })
)

routes.get(
  '/user-me',
  authorization,
  asyncHandler(async (req, res) => {
    const user = req.user

    const data = await UserService.findById(user.id)

    const httpResponse = HttpResponse.get({ data })

    res.status(200).json(httpResponse)
  })
)

routes.put(
  '/user-me/update',
  authorization,
  asyncHandler(async (req, res) => {
    const user = req.user

    const txn = await req.transaction

    const data = await UserService.findById(user.id)

    const formData = {
      ...req.body,
      RoleId: data.RoleId,
    }

    const value = userSchema.update.validateSync(formData)

    await data.update(
      {
        ...data,
        ...value,
      },
      { transaction: txn }
    )

    const httpResponse = HttpResponse.updated({})

    await txn.commit()

    res.status(200).json(httpResponse)
  })
)

routes.put(
  '/user-me/change-password',
  authorization,
  asyncHandler(async (req, res) => {
    const user = req.user

    const txn = await req.transaction

    await UserService.changePassword(user.id, req.body, txn)

    const httpResponse = HttpResponse.updated({})

    res.status(200).json(httpResponse)
  })
)
