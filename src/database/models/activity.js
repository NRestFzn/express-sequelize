const { Model, DataTypes } = require('sequelize')
const db = require('./_instance')

class activity extends Model {}

activity.init(
  {
    userId: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    isImportant: DataTypes.BOOLEAN,
    activityDate: DataTypes.STRING,
  },
  { sequelize: db.sequelize, tableName: 'activities', paranoid: true }
)

module.exports = activity
