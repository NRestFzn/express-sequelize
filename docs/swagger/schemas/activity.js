module.exports = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
      userId: {
        type: 'string',
      },
      activity: {
        type: 'string',
      },
      isImportant: {
        type: 'string',
      },
      activityDate: {
        type: 'date',
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
