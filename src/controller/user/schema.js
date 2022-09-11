const yup = require('yup')

const registerSchema = yup.object({
  username: yup.string().required('username harus di isi!'),
  fullname: yup.string().required('nama lengkap harus di isi!'),
  email: yup.string().email('email invalid').required('email harus di isi!'),
  password: yup
    .string()
    .required('password harus di isi!')
    .min(8, 'password minimal 8 karakter')
    .oneOf([yup.ref('password')], 'password tidak sama!'),
  confirmPassword: yup
    .string()
    .required('confirm password harus di isi!')
    .min(8, 'password minimal 8 karakter')
    .oneOf([yup.ref('password')], 'password tidak sama!'),
})

const loginSchema = yup.object({
  username: yup.string().required('username atau email harus di isi!'),
  password: yup
    .string()
    .min(8, 'password harus berisi 8 karakter')
    .required('password harus di isi!'),
})

const userSchema = { registerSchema, loginSchema }

module.exports = userSchema
