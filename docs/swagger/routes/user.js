module.exports = {
  '/user': {
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
        201: {
          description: 'Create new user',
        },
      },
    },
    get: {
      tags: ['User'],
      summary: 'Get all user',
      security: [],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Get all user',
        },
      },
    },
  },

  '/user/{id}': {
    get: {
      tags: ['User'],
      summary: 'Get user by id',
      security: [],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'integer',
          },
          example: 1,
        },
      ],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Get user by id',
        },
      },
    },
    put: {
      tags: ['User'],
      summary: 'update user by id',
      security: [],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'integer',
          },
          example: 1,
        },
      ],
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
      produces: ['application/json'],
      responses: {
        200: {
          description: 'force delete user by id',
        },
      },
    },
  },

  '/user/me': {
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
          description: 'Update data user itself with token',
        },
      },
    },
    get: {
      tags: ['User'],
      summary: 'Get user by token',
      security: [{ tokenpublic: [] }],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Get user by token',
        },
      },
    },
  },

  '/softdelete/user/{id}': {
    delete: {
      tags: ['User'],
      summary: 'soft delete user by id',
      security: [],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'integer',
          },
          example: 1,
        },
      ],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'soft delete user by id',
        },
      },
    },
  },

  '/forcedelete/user/{id}': {
    delete: {
      tags: ['User'],
      summary: 'force delete user by id',
      security: [],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'integer',
          },
          example: 1,
        },
      ],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'force delete user by id',
        },
      },
    },
  },

  '/restore/user/{id}': {
    put: {
      tags: ['User'],
      summary: 'restore deleted user by id',
      security: [],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'integer',
          },
          example: 1,
        },
      ],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'restore deleted user by id',
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
          description: 'User login',
        },
      },
    },
  },
}
