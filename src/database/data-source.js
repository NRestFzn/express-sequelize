const { blue } = require('colorette')
const fs = require('fs')
const path = require('path')
const { Sequelize } = require('sequelize')
const env = require('../config/env.config')

const sequelizeOptions = {
  dialect: env.SEQUELIZE_CONNECTION,
  host: env.SEQUELIZE_HOST,
  port: env.SEQUELIZE_PORT,
  logQueryParameters: env.SEQUELIZE_LOGGING,
  timezone: env.SEQUELIZE_TIMEZONE,
  models: [`${__dirname}/models`],
  // repositoryMode: true,
}

const sequelize = new Sequelize(
  env.SEQUELIZE_DATABASE,
  env.SEQUELIZE_USERNAME,
  env.SEQUELIZE_PASSWORD,
  { ...sequelizeOptions }
)

const db = { sequelize }

module.exports = db
