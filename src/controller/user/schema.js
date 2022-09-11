const yup = require('yup')

const registerSchema = yup.object({
  username: yup.string().required('username harus di isi!'),
  fullname: yup.string().required('nama lengkap harus di isi!'),
  email: yup.string().email('email invalid').required('email harus di isi!'),
  password: yup
    .string()
    .min(8, 'password minimal berisi 8 karakter')
    .required('password harus di isi!'),
  confirmPassword: yup
    .string()
    .min(8, 'confirm password minimal berisi 8 karakter')
    .required('confirm password harus di isi!'),
})

const userSchema = { registerSchema }

module.exports = userSchema
