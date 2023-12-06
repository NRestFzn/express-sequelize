require('dotenv').config()

function getEnv(value, fallback) {
  const result = process.env[value]

  // check env value
  if ([undefined, null, ''].includes(result)) {
    // check fallback
    if (fallback) {
      return fallback
    }

    return undefined
  }

  return result
}

/**
 * App Env
 */
const appEnv = {
  // Application
  NODE_ENV: getEnv('NODE_ENV', 'development'),

  APP_KEY: getEnv('APP_KEY'),
  APP_NAME: getEnv('APP_NAME', 'express-sequelize'),
  APP_LANG: getEnv('APP_LANG', 'id'),
  APP_PORT: Number(getEnv('APP_PORT', 8000)),
}

/**
 * Secret Env
 */
const secretEnv = {
  // JWT
  JWT_SECRET_ACCESS_TOKEN: getEnv('JWT_SECRET_ACCESS_TOKEN'),
  JWT_ACCESS_TOKEN_EXPIRED: getEnv('JWT_ACCESS_TOKEN_EXPIRED', '1d'),

  JWT_SECRET_REFRESH_TOKEN: getEnv('JWT_SECRET_REFRESH_TOKEN'),
  JWT_REFRESH_TOKEN_EXPIRED: getEnv('JWT_REFRESH_TOKEN_EXPIRED', '30d'),
}

/**
 * Base URL Env
 */
const baseURLEnv = {
  // Base URL
  URL_CLIENT_STAGING: getEnv(
    'URL_CLIENT_STAGING',
    'https://sandbox.example.com'
  ),
  URL_SERVER_STAGING: getEnv(
    'URL_SERVER_STAGING',
    'https://api-sandbox.example.com'
  ),

  URL_CLIENT_PRODUCTION: getEnv('URL_CLIENT_PRODUCTION', 'https://example.com'),
  URL_SERVER_PRODUCTION: getEnv(
    'URL_SERVER_PRODUCTION',
    'https://api.example.com'
  ),
}

/**
 * Database Env
 */
const databaseEnv = {
  SEQUELIZE_CONNECTION: getEnv('SEQUELIZE_CONNECTION', 'mysql'),
  SEQUELIZE_HOST: getEnv('SEQUELIZE_HOST', 'localhost'),
  SEQUELIZE_PORT: Number(getEnv('SEQUELIZE_PORT', 3306)),
  SEQUELIZE_DATABASE: getEnv('SEQUELIZE_DATABASE', 'express_sequelize'),
  SEQUELIZE_USERNAME: getEnv('SEQUELIZE_USERNAME', 'root'),
  SEQUELIZE_PASSWORD: getEnv('SEQUELIZE_PASSWORD', '12345678'),
  SEQUELIZE_SYNC: getEnv('SEQUELIZE_SYNC', true),
  SEQUELIZE_LOGGING: getEnv('SEQUELIZE_LOGGING', true),
  SEQUELIZE_TIMEZONE: getEnv('SEQUELIZE_TIMEZONE', 'Asia/Jakarta'),
}

module.exports = {
  ...appEnv,
  ...secretEnv,
  ...databaseEnv,
  ...baseURLEnv,
}
