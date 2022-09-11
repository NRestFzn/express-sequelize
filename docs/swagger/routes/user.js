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
  },
}
