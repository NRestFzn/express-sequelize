const schema = require('../schemas/role')

module.exports = {
  '/role': {
    get: {
      tags: ['Role'],
      summary: 'Get All Role',
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
          description: 'Get All Role',
        },
      },
    },
    post: {
      //   security: [{ Bearer: [] }],
      tags: ['Role'],
      summary: 'Create New Role',
      parameters: [],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: schema.Role,
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Role',
        },
      },
    },
  },

  '/role/{id}': {
    get: {
      tags: ['Role'],
      summary: 'Get Role By Id',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Role Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Role By Id',
        },
      },
    },
    put: {
      tags: ['Role'],
      summary: 'Update Role By Id',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Role Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: schema.Role,
          },
        },
      },
      responses: {
        200: {
          description: 'Update Role By Id',
        },
      },
    },
    delete: {
      //   security: [{ Bearer: [] }],
      tags: ['Role'],
      summary: 'Delete Data Role',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Role Id',
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
          description: 'Delete Data Role',
        },
      },
    },
  },
}
