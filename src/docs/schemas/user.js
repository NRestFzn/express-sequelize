module.exports = {
  User: {
    type: 'object',
    properties: {
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
      RoleId: {
        type: 'string',
      },
    },
    required: ['fullname', 'email', 'password', 'confirmPassword', 'RoleId'],
  },
}
