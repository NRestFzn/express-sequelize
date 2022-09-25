const yup = require('yup')

const createActivity = yup.object({
  activity: yup.string().required('activity harus di isi!'),
  activityDate: yup.string().required('harap masukan tanggal!'),
})

const schema = { createActivity }
module.exports = schema
