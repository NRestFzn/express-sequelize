require('dotenv').config()
const {
  DEV_DB_USERNAME,
  DEV_DB_PASSWORD,
  DEV_DB_DATABASE,
  DEV_DB_HOST,
  DEV_DB_CONNECTION,
  PROD_DB_USERNAME,
  PROD_DB_PASSWORD,
  PROD_DB_DATABASE,
  PROD_DB_HOST,
  PROD_DB_CONNECTION,
} = process.env

module.exports = {
  development: {
    username: DEV_DB_USERNAME,
    password: DEV_DB_PASSWORD,
    database: DEV_DB_DATABASE,
    host: DEV_DB_HOST,
    dialect: DEV_DB_CONNECTION,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: PROD_DB_USERNAME,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_DATABASE,
    host: PROD_DB_HOST,
    dialect: PROD_DB_CONNECTION,
  },
}
