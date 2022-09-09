const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('hallo', { title: 'Express' })
})

module.exports = router

// require('../controller/user/user.js')
