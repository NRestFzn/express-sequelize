require('dotenv').config()

module.exports = {
  username: process.env.SEQUELIZE_USERNAME,
  password: process.env.SEQUELIZE_PASSWORD,
  database: process.env.SEQUELIZE_DATABASE,
  host: process.env.SEQUELIZE_HOST,
  port: process.env.SEQUELIZE_PORT,
  dialect: process.env.SEQUELIZE_CONNECTION,
  timezone: process.env.SEQUELIZE_TIMEZONE,
}
