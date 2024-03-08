import axios from 'axios'
import env from '../../config/env.config'

const ServiceFacebook = {
  getFacebookOAuthAccess: async () => {
    const url = 'https://graph.facebook.com/oauth/access_token?'
    const values = {
      client_id: env.FACEBOOK_APP_ID,
      client_secret: env.FACEBOOK_APP_SECRET,
      grant_type: 'client_credentials',
    }

    const valuesToString = Object.keys(values)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(values[key])}`)
      .join('&')

    try {
      const res = await axios.get(url + valuesToString)
      return res.data
    } catch (error) {
      return error
    }
  },
  validateUserAccessToken: async (userAccessToken, appAccessToken) => {
    const url = 'https://graph.facebook.com/debug_token?'
    const values = {
      input_token: userAccessToken, //access_token from user
      access_token: appAccessToken, //access_token from app
    }

    const valuesToString = Object.keys(values)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(values[key])}`)
      .join('&')

    try {
      const res = await axios.get(url + valuesToString)
      return res.data
    } catch (error) {
      return error
    }
  },
  getUserData: async (user_id, access_token) => {
    const url = `https://graph.facebook.com/${user_id}?`
    const values = {
      access_token: access_token, //access_token from app
      fields: 'email, name, gender, birthday, picture',
    }

    const valuesToString = Object.keys(values)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(values[key])}`)
      .join('&')

    try {
      const res = await axios.get(url + valuesToString)
      return res.data
    } catch (error) {
      return error
    }
  },
}

module.exports = ServiceFacebook
