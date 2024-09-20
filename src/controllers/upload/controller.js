import routes from '@routes/v1'
import asyncHandler from '@helpers/asyncHandler'
import { useMulter, getDefaultUploadFileOptions } from '@helpers/multer'

const uploadFile = useMulter(
  getDefaultUploadFileOptions({
    dest: 'public/uploads',
  })
).fields([{ name: 'file', maxCount: 2 }])

const setFileToBody = asyncHandler(async function setFileToBody(
  req,
  res,
  next
) {
  req.body.file = req.files.file
  next()
})

routes.post(
  '/upload',
  uploadFile,
  setFileToBody,
  asyncHandler(async (req, res) => {
    const data = req.body.file

    res.status(200).json({ data })
  })
)
