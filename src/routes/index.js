const express = require('express')
const router = express.Router()
const Role = require('../database/models/role')

router.get('/', function (req, res) {
  res.render('hallo', { title: 'Express Js' })
})

module.exports = router
require('../controllers/role/controller')
