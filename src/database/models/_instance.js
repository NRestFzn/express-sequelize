const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
require('dotenv').config()
const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_CONNECTION, DB_HOST } =
  process.env

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_CONNECTION,
})

const db = {
  sequelize,
  Sequelize,
}

module.exports = db
