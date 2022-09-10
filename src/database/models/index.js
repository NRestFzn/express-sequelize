const user = require('./user')

const models = {
  user,
}

// relation
// User.belongsTo(Role, { foreignKey: 'RoleId' })

module.exports = models

// export type MyModels = typeof models

// Object.entries(models).map(([, model]) => {
//   if (model?.associate) {
//     model.associate(models)
//   }
//   return model
// })
