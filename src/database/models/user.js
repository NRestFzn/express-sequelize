const { Model, DataTypes } = require('sequelize')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  fullname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  RoleId: {
    type: DataTypes.UUID,
    references: {
      model: 'Roles',
      key: 'id',
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
})

module.exports = User
