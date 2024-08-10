import env from '@config/env.config'

const URL_CLIENT = {
  development: 'http://localhost:1501',
  staging: env.URL_CLIENT_STAGING,
  production: env.URL_CLIENT_PRODUCTION,
}

const URL_SERVER = {
  development: `http://localhost:${env.APP_PORT}`,
  staging: env.URL_SERVER_STAGING,
  production: env.URL_SERVER_PRODUCTION,
}

module.exports = {
  BASE_URL_CLIENT: URL_CLIENT[env.NODE_ENV],
  BASE_URL_SERVER: URL_SERVER[env.NODE_ENV],
}
