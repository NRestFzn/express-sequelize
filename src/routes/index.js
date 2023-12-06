const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('hallo', { title: 'Express Js' })
})

module.exports = router
