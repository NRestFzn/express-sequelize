module.exports = {
  '/user/register': {
    post: {
      tags: ['User'],
      summary: 'Create new user',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
                fullname: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
                confirmPassword: {
                  type: 'string',
                },
              },
              required: [
                'username',
                'password',
                'confirmPassword',
                'email',
                'fullname',
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'OK',
        },
      },
    },
  },

  'user/me': {
    get: {
      tags: ['User'],
      summary: 'Get user by token',
      security: [{ tokenpublic: [] }],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'OK',
        },
      },
    },
  },

  '/user/me/update': {
    put: {
      tags: ['User'],
      summary: 'Update data user itself with token',
      security: [{ tokenpublic: [] }],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
                fullname: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
              },
              required: ['username', 'email', 'fullname'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'OK',
        },
      },
    },
  },

  '/user/upload-photo': {
    put: {
      tags: ['User'],
      summary: 'Upload photo',
      security: [{ tokenpublic: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                image: {
                  type: 'string',
                  format: 'binary',
                },
              },
              required: ['image'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'OK',
        },
      },
    },
  },

  '/login': {
    post: {
      tags: ['User'],
      summary: 'User login',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },

                password: {
                  type: 'string',
                },
              },
              required: ['username', 'password'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'OK',
        },
      },
    },
  },
}
