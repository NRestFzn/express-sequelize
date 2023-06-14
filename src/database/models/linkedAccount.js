const { Model, DataTypes } = require('sequelize')
const db = require('./_instance')

class linkedAccount extends Model {}

linkedAccount.init(
  {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize: db.sequelize, tableName: 'linkedAccounts', paranoid: true }
)

module.exports = linkedAccount
