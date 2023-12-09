const yup = require('yup')

const create = yup.object().shape({
  fullname: yup.string().required('Fullname is required'),
  email: yup.string().email('invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  RoleId: yup.string().required('RoleId is required'),
})

const userSchema = {
  create,
}

module.exports = userSchema
