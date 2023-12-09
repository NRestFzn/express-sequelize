const express = require('express')
const router = express.Router()
const getRoutes = require('../helpers/routing')
const path = require('path')

const baseRoutes = path.resolve(`${__dirname}/../controllers`)

module.exports = router
// Mapping Route
try {
  console.log('registering routes....')
  getRoutes(baseRoutes)
} catch (error) {
  console.log(error)
}
