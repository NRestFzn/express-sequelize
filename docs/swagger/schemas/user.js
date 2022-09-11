module.exports = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
      username: {
        type: 'string',
      },
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
        format: 'password',
      },

      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
      deletedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
}
