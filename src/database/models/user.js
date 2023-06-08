const { Model, DataTypes } = require('sequelize')
const db = require('./_instance')

class user extends Model {}

user.init(
  {
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    role: DataTypes.STRING,
    registerWith: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  { sequelize: db.sequelize, tableName: 'users', paranoid: true }
)

module.exports = user
