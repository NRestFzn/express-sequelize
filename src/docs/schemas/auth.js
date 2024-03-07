module.exports = {
  Login: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    required: ['email', 'password'],
  },

  Register: {
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
    },
    required: ['fullname', 'email', 'password', 'confirmPassword'],
  },
}
