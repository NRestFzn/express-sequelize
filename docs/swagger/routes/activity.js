module.exports = {
  '/activity/create': {
    post: {
      tags: ['Activity'],
      summary: 'Create new activity',
      security: [{ tokenpublic: [] }],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                activity: {
                  type: 'string',
                },
                activityDate: {
                  type: 'string',
                  description: 'mm/dd/yy or yy/mm/dd',
                },
                isImportant: {
                  type: 'boolean',
                },
              },
              required: ['activity', 'activityDate', 'isImportant'],
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

  '/my-activities': {
    get: {
      tags: ['Activity'],
      summary: 'Get my activities',
      security: [{ tokenpublic: [] }],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'OK',
        },
      },
    },
  },

  '/my-activity/update/{id}': {
    put: {
      tags: ['Activity'],
      summary: 'Update my activity by id',
      security: [{ tokenpublic: [] }],
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
                activity: {
                  type: 'string',
                },
                activityDate: {
                  type: 'string',
                  description: 'mm/dd/yy or yy/mm/dd',
                },
                isImportant: {
                  type: 'boolean',
                },
              },
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
  '/my-activity/delete/{id}': {
    delete: {
      tags: ['Activity'],
      summary: 'Delete my activity by id',
      security: [{ tokenpublic: [] }],
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
