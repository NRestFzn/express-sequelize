import ejs from 'ejs'
import cors from 'cors'
import path from 'path'
import helmet from 'helmet'
import logger from 'morgan'
import express from 'express'
import env from './env.config'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import db from '@database/data-source'
import indexRoutes from '@routes/index'
import swaggerUI from 'swagger-ui-express'
import { blue, red, cyan, green } from 'colorette'
import ExpressErrorYup from '@middlewares/expressErrorYup'
import ResponseError from '@modules/response/ResponseError'
import expressErrorResponse from '@middlewares/expressErrorResponse'
import { optionsSwaggerUI, swaggerSpec } from '@modules/docsSwagger'
import expressErrorSequelize from '@middlewares/expressErrorSequelize'

require('@babel/register')({ extensions: ['.js', '.ts'] })

class App {
  _app
  _port

  constructor() {
    this._app = express()
    this._port = env.APP_PORT
    this._plugin()
    this._swagger()
    this._database()
    this._routes()
    this._errorHandling()
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

  _errorHandling() {
    this._app.use(ExpressErrorYup)
    this._app.use(expressErrorSequelize)
    this._app.use(expressErrorResponse)
  }

  _swagger() {
    this._app.get('/v1/api-docs.json', (reqt, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })

    this._app.use('/v1/api-docs', swaggerUI.serve)
    this._app.get(
      '/v1/api-docs',
      swaggerUI.setup(swaggerSpec, optionsSwaggerUI)
    )
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
    this._app.set('port', this._port)
    return this._app
  }
}

module.exports = { App }
