const user = require('./user')
const activities = require('./activity')

const models = {
  user,
  activities,
}

// relation
user.hasMany(activities, { foreignKey: 'userId' })

module.exports = models
