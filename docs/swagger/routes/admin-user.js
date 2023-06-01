module.exports = {
  '/user': {
    get: {
      tags: ['Admin - User'],
      summary: 'Get all user',
      security: [{ tokenadmin: [] }],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'OK',
        },
      },
    },
  },

  '/user/{id}': {
    get: {
      tags: ['Admin - User'],
      summary: 'Get user by id',
      security: [{ tokenadmin: [] }],
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
          description: 'OK',
        },
      },
    },
  },

  'user/update/{id}': {
    put: {
      tags: ['Admin - User'],
      summary: 'update user by id',
      security: [{ tokenadmin: [] }],
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
          description: 'OK',
        },
      },
    },
  },

  '/user/softdelete/{id}': {
    delete: {
      tags: ['Admin - User'],
      summary: 'soft delete user by id',
      security: [{ tokenadmin: [] }],
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
          description: 'OK',
        },
      },
    },
  },

  '/user/forcedelete/{id}': {
    delete: {
      tags: ['Admin - User'],
      summary: 'force delete user by id',
      security: [{ tokenadmin: [] }],
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
          description: 'OK',
        },
      },
    },
  },

  '/user/restore/{id}': {
    put: {
      tags: ['Admin - User'],
      summary: 'restore deleted user by id',
      security: [{ tokenadmin: [] }],
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
          description: 'OK',
        },
      },
    },
  },
}
