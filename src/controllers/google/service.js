const axios = require('axios')
const env = require('../../config/env.config')

const ServiceGoogle = {
  getGoogleOAuthTokens: async (redirect_uri, code) => {
    const token = 'https://oauth2.googleapis.com/token'
    try {
      const { data } = await axios.post(token, {
        code,
        client_id: env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri,
        grant_type: 'authorization_code',
      })
      return data
    } catch (error) {
      return error.message
    }
  },
  getGoogleUser: async (id_token, access_token) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      return data
    } catch (error) {
      return error.message
    }
  },
}

module.exports = ServiceGoogle
