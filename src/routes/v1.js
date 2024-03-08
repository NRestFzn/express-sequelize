import path from 'path'
import express from 'express'
import getRoutes from '../helpers/routing'

const router = express.Router()

const baseRoutes = path.resolve(`${__dirname}/../controllers`)

module.exports = router
// Mapping Route
try {
  console.log('registering routes....')
  getRoutes(baseRoutes)
} catch (error) {
  console.log(error)
}
