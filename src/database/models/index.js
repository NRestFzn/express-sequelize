const user = require('./user')
const activities = require('./activity')
const linkedAccount = require('./linkedAccount')

const models = {
  user,
  activities,
  linkedAccount,
}

// relation
user.hasMany(activities, { foreignKey: 'userId' })

module.exports = models
