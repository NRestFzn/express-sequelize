const express = require('express')
const router = express.Router()
const v1Routes = require('./v1')
const { APP_NAME } = require('../config/env.config')

router.get('/', function (req, res) {
  res.render('hallo', { title: APP_NAME })
})

router.use('/v1', v1Routes)
module.exports = router
