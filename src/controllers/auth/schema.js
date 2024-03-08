import * as yup from 'yup'

const login = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const register = yup.object().shape({
  fullname: yup.string().required('Fullname is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password min 8 character').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),

  RoleId: yup.string().required('RoleId is required'),
})

const authSchema = {
  login,
  register,
}

module.exports = authSchema
