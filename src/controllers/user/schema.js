import * as yup from 'yup'

const create = yup.object().shape({
  fullname: yup.string().required('Fullname is required'),
  email: yup.string().email('invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password min 8 character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  RoleId: yup.string().required('RoleId is required'),
})

const update = yup.object().shape({
  fullname: yup.string().required('Fullname is required'),
  email: yup.string().email('invalid email').required('Email is required'),
  RoleId: yup.string().required('RoleId is required'),
})

const changePassword = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup.string().required('new Password is required'),
  confirmNewPassword: yup
    .string()
    .min(8, 'Password min 8 character')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm new password is required'),
})

const userSchema = {
  create,
  update,
  changePassword,
}

module.exports = userSchema
