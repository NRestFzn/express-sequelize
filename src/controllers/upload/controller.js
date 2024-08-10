import routes from '@routes/v1'
import asyncHandler from '@helpers/asyncHandler'
import { useMulter, getDefaultUploadFileOptions } from '@helpers/multer'

const uploadFile = useMulter(
  getDefaultUploadFileOptions({
    dest: 'public/uploads/avatar',
    onlyImages: true,
  })
).fields([{ name: 'avatar', maxCount: 2 }])

const setFileToBody = asyncHandler(async function setFileToBody(
  req,
  res,
  next
) {
  req.body.avatar = req.files.avatar
  next()
})

routes.post(
  '/upload-avatar',
  uploadFile,
  setFileToBody,
  asyncHandler(async (req, res) => {
    res.status(200).json({ msg: req.body })
  })
)
