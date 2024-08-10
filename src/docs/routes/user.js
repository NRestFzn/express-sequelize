const schema = require('../schemas/user')

module.exports = {
  '/user': {
    get: {
      tags: ['User'],
      summary: 'Get All User',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          $ref: '#/components/parameters/page',
        },
        {
          $ref: '#/components/parameters/pageSize',
        },
        {
          $ref: '#/components/parameters/filtered',
        },
        {
          $ref: '#/components/parameters/sorted',
        },
      ],
      responses: {
        200: {
          description: 'Get All User',
        },
      },
    },
    post: {
      tags: ['User'],
      summary: 'Create New User',
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: schema.Create,
          },
        },
      },
      responses: {
        201: {
          description: 'Create New User',
        },
      },
    },
  },

  '/user/{id}': {
    get: {
      tags: ['User'],
      summary: 'Get User By Id',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'User Id',
        },
      ],
      responses: {
        200: {
          description: 'Get User By Id',
        },
      },
    },
    put: {
      tags: ['User'],
      summary: 'Update User By Id',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'User Id',
        },
      ],
      requestBody: {
        required: true,

        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                fullname: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                RoleId: {
                  type: 'string',
                },
              },
              required: ['fullname', 'email', 'RoleId'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update User By Id',
        },
      },
    },
    delete: {
      tags: ['User'],
      summary: 'Delete Data User',
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'User Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Data User',
        },
      },
    },
  },

  '/user/change-password/{id}': {
    put: {
      tags: ['User'],
      summary: 'Change User Password',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'User Id',
        },
      ],
      requestBody: {
        required: true,

        content: {
          'application/x-www-form-urlencoded': {
            schema: schema.ChangePassword,
          },
        },
      },
      responses: {
        200: {
          description: 'Change User Password',
        },
      },
    },
  },

  '/user-me': {
    get: {
      tags: ['User'],
      summary: 'Get My Data',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      responses: {
        200: {
          description: 'Get My Data',
        },
      },
    },
  },

  '/user-me/update': {
    put: {
      tags: ['User'],
      summary: 'Update My Data',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,

        content: {
          'application/x-www-form-urlencoded': {
            schema: schema.Update,
          },
        },
      },
      responses: {
        200: {
          description: 'Update My Data',
        },
      },
    },
  },

  '/user-me/change-password': {
    put: {
      tags: ['User'],
      summary: 'Change My Password',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,

        content: {
          'application/x-www-form-urlencoded': {
            schema: schema.ChangePassword,
          },
        },
      },
      responses: {
        200: {
          description: 'Change My Password',
        },
      },
    },
  },
}
