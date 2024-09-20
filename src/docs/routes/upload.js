const schema = require('../schemas/upload')

module.exports = {
  '/upload': {
    post: {
      tags: ['Upload'],
      summary: 'Upload file',
      parameters: [],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: schema.Upload,
          },
        },
      },
      responses: {
        201: {
          description: 'Upload file',
        },
      },
    },
  },
}
