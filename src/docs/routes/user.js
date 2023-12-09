const schema = require('../schemas/user')

module.exports = {
  '/user': {
    get: {
      tags: ['User'],
      summary: 'Get All User',
      produces: ['application/json'],
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
      //   security: [{ Bearer: [] }],
      tags: ['User'],
      summary: 'Create New User',
      parameters: [],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: schema.User,
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
            schema: schema.User,
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
      //   security: [{ Bearer: [] }],
      tags: ['User'],
      summary: 'Delete Data User',
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
        // {
        //   in: 'query',
        //   name: 'force',
        //   schema: {
        //     type: 'boolean',
        //   },
        //   description: 'Is Force?',
        // },
      ],
      responses: {
        200: {
          description: 'Delete Data User',
        },
      },
    },
  },
}
