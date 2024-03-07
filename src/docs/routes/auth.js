const schema = require('../schemas/auth')

module.exports = {
  '/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login to your account',
      parameters: [],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: schema.Login,
          },
        },
      },
      responses: {
        201: {
          description: 'Login to your account',
        },
      },
    },
  },

  '/register': {
    post: {
      tags: ['Auth'],
      summary: 'Create new account',
      parameters: [],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: schema.Register,
          },
        },
      },
      responses: {
        201: {
          description: 'Create new account',
        },
      },
    },
  },
}
