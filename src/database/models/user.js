const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../data-source')
const { hashSync } = require('bcrypt')
const Role = require('./role')

class User extends Model {}

User.init(
  {
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
      set(value) {
        this.setDataValue('password', hashSync(value, 7))
      },
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
  },
  { sequelize }
)

User.belongsTo(Role, { foreignKey: 'RoleId' })

module.exports = User
