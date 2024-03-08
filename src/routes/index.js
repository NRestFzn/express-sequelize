import express from 'express'
const router = express.Router()
const v1Routes = require('./v1')
const { APP_NAME } = require('config/env.config')
const { BASE_URL_SERVER } = require('constants/BaseUrl')

router.get('/', function (req, res) {
  res.render('hallo', {
    title: APP_NAME,
    docsURL: `${BASE_URL_SERVER}/v1/api-docs`,
  })
})

router.use('/v1', v1Routes)
module.exports = router
