import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../data-source'
import { hashSync } from 'bcrypt'
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
      unique: {
        msg: 'Email is already used',
      },
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', hashSync(value, 7))
      },
    },
    RoleId: {
      type: DataTypes.UUID,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    sequelize,
  }
)

User.addScope('withPassword', { attributes: {} })

User.belongsTo(Role, { foreignKey: 'RoleId' })

module.exports = User
