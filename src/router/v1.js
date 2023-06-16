const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('hallo', { title: 'Express Js' })
})

module.exports = router

require('../controllers/user/controller')
require('../controllers/activity/controller')
require('../controllers/google/controller')
require('../controllers/facebook/controller')
