import * as yup from 'yup'

const create = yup.object().shape({
  name: yup.string().required('Name is required'),
})

const roleSchema = {
  create,
}

module.exports = roleSchema
