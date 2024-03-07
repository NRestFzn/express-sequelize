module.exports = {
  Create: {
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

  Update: {
    type: 'object',
    properties: {
      fullname: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
    },
    required: ['fullname', 'email'],
  },

  ChangePassword: {
    type: 'object',
    properties: {
      oldPassword: {
        type: 'string',
      },
      newPassword: {
        type: 'string',
      },
      confirmNewPassword: {
        type: 'string',
      },
    },
    required: ['oldPassword', 'newPassword', 'confirmNewPassword'],
  },
}
