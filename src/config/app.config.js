const ejs = require('ejs')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const logger = require('morgan')
const express = require('express')
const env = require('./env.config.js')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const db = require('../database/data-source.js')
const indexRoutes = require('../routes/index.js')
const { blue, red, cyan, green } = require('colorette')
const ResponseError = require('../modules/response/ResponseError.js')

class App {
  _app
  _port

  constructor() {
    this._app = express()
    this._port = env.APP_PORT
    this._plugin()
    this._routes()
    this._database()
  }

  /**
   * Initialize Plugin
   */
  _plugin() {
    this._app.use(cors())
    this._app.use(helmet())
    this._app.use(compression())
    this._app.use(logger('dev'))
    this._app.use(cookieParser())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(express.static(path.join(__dirname, '../../public')))
    this._app.use(express.json({ limit: '200mb', type: 'application/json' }))
    this._app.engine('ejs', ejs.renderFile)
    this._app.set('views', path.join(`${__dirname}/../../public/views`))
    this._app.set('view engine', 'ejs')
  }

  /**
   * Initialize Routes
   */
  _routes() {
    this._app.use(indexRoutes)

    // Catch error 404 endpoint not found
    this._app.use('*', function (req, _res) {
      const method = req.method
      const url = req.originalUrl
      const host = req.hostname

      const endpoint = `${host}${url}`

      throw new ResponseError.NotFound(
        `Sorry, the ${endpoint} HTTP method ${method} resource you are looking for was not found.`
      )
    })
  }

  /**
   * Initialize Database
   */
  _database() {
    const dbDialect = blue(env.SEQUELIZE_CONNECTION)
    const dbName = blue(env.SEQUELIZE_DATABASE)

    db.sequelize
      .authenticate()
      .then(async () => {
        const msgType = green(`sequelize`)
        const message = `connection ${dbDialect}: ${dbName} has been established successfully.`

        console.log(`${msgType} - ${message}`)
      })
      .catch((err) => {
        const errType = red(`sequelize error`)
        const message = `unable to connect to the database ${dbDialect}: ${dbName}`

        console.log(`${errType} - ${message}`)
        console.log(cyan(err.message))
      })
  }

  create() {
    // this._app.use(expressErrorZod)
    // this._app.use(expressErrorSequelize)
    // this._app.use(expressErrorResponse)

    this._app.set('port', this._port)
    return this._app
  }
}

module.exports = { App }
