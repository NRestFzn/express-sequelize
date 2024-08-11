import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import multer from 'multer'
import slugify from 'slugify'
import ResponseError from '@modules/response/ResponseError'

const defaultFieldSize = 100 * 1024 * 1024 // 100mb
const defaultFileSize = 100 * 1024 * 1024 // 100mb
const defaultDestination = 'public/uploads'

// extension
export const allowedZIP = ['.zip', '.7z']
export const allowedPDF = ['.pdf']
export const allowedImage = ['.png', '.jpg', '.jpeg', '.svg']
export const allowedExcel = ['.xlsx', '.xls']
export const allowedDoc = ['.doc', '.docx']
export const allowedVideo = ['.mkv', '.mp4', '.webm']

const defaultAllowedExt = [
  ...allowedZIP,
  ...allowedPDF,
  ...allowedImage,
  ...allowedExcel,
  ...allowedDoc,
]

// mimetype
export const allowedMimetypeZIP = [
  'application/zip',
  'application/x-zip-compressed',
  'application/x-7z-compressed',
]
export const allowedMimetypePDF = ['application/pdf']
export const allowedMimetypeImage = ['image/jpeg', 'image/png', 'image/svg+xml']
export const allowedMimetypeVideo = ['video/mkv', 'video/mp4', 'video/webm']
export const allowedMimetypeExcel = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]
export const allowedMimetypeDoc = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const defaultAllowedMimetype = [
  ...allowedMimetypeZIP,
  ...allowedMimetypePDF,
  ...allowedMimetypeImage,
  ...allowedMimetypeExcel,
  ...allowedMimetypeDoc,
  ...allowedMimetypeVideo,
]

const useMulter = (props) => {
  // always check destination
  const destination = props.dest ?? defaultDestination

  // config storage
  const storage = multer.diskStorage({
    destination,
    filename(req, file, cb) {
      const slugFilename = slugify(file.originalname, {
        replacement: '_',
        lower: true,
      })
      cb(null, [Date.now(), slugFilename].join('-'))
    },
  })

  // config multer upload
  const configMulter = multer({
    storage,
    fileFilter(req, file, cb) {
      const allowedMimetype = props.allowedMimetype ?? defaultAllowedMimetype
      const allowedExt = props.allowedExt ?? defaultAllowedExt
      const mimetype = file.mimetype.toLowerCase()

      console.log({ mimetype })

      if (!allowedMimetype.includes(mimetype)) {
        return cb(
          new ResponseError.BadRequest(
            `Only ${allowedExt.join(', ')} ext are allowed`
          )
        )
      }

      cb(null, true)
    },
    limits: props.limit ?? {
      fieldSize: defaultFieldSize,
      fileSize: defaultFileSize,
    },
  })

  return configMulter
}

function getDefaultUploadFileOptions(params = {}) {
  const {
    dest = 'public/uploads/',
    maxSizeUpload = 25,
    onlyImages = false,
    onlyDocuments = false,
    allowedExt = [],
    allowedMimetype = [],
  } = params
  return {
    dest: params.dest ? params.dest : dest,
    allowedExt: [
      // Images
      ...(onlyDocuments ? [] : ['.png', '.jpeg', '.jpg']),
      // Documents
      ...(onlyImages ? [] : ['.docx', '.pdf', '.xlsx', '.doc', '.xls']),
      ...allowedExt,
    ],
    allowedMimetype: [
      // Images
      ...(onlyDocuments ? [] : ['image/jpeg', 'image/png']),
      // Documents
      ...(onlyImages
        ? []
        : [
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/msword',
            'application/vnd.ms-excel',
          ]),
      ...allowedMimetype,
    ],
    limit: {
      fieldSize: maxSizeUpload * 1024 * 1024,
      fileSize: maxSizeUpload * 1024 * 1024,
    },
  }
}

module.exports = { useMulter, getDefaultUploadFileOptions }
