const swaggerDocs = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const fs = require('fs')
const _path = require('path')
require('dotenv').config()
const { BASE_URL_LOCAL } = process.env
const baseRoutes = _path.resolve('./docs/swagger/routes')
const baseSchemas = _path.resolve('./docs/swagger/schemas')

const getPathRoutes = (path) => `${baseRoutes}${path}`
const getPathSchemes = (path) => `${baseSchemas}${path}`

const getDocs = (basePath, getPath) => {
  return fs.readdirSync(basePath).reduce((acc, file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const data = require(getPath(`/${file}`))
    // eslint-disable-next-line no-param-reassign
    acc = {
      ...acc,
      ...data,
    }
    return acc
  }, {})
}

const docsSources = getDocs(baseRoutes, getPathRoutes)
const docsSchemes = getDocs(baseSchemas, getPathSchemes)

module.exports = function generateDocs(app) {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      servers: [
        {
          url: 'http://localhost:8000/v1',
          description: 'Local server',
        },
      ],
      // security: [  //Set GLOBAL
      //   {
      //     ApiKeyAuth: []
      //   }
      // ],
      components: {
        securitySchemes: {
          tokenpublic: {
            description: 'Login first and copy token here',
            type: 'apiKey',
            in: 'header',
            name: 'tokenpublic',
          },
          tokenadmin: {
            description: 'Login Admin first and copy token here',
            type: 'apiKey',
            in: 'header',
            name: 'token',
          },
        },
        schemas: docsSchemes,
        parameters: {
          page: {
            in: 'query',
            name: 'page',
            required: false,
            default: 0,
          },
          pageSize: {
            in: 'query',
            name: 'pageSize',
            required: false,
            default: 10,
          },
          filtered: {
            in: 'query',
            name: 'filtered',
            required: false,
            default: [],
            description: 'Example: [{"id": "nama", "value": "test"}]',
          },
          sorted: {
            in: 'query',
            name: 'sorted',
            required: false,
            default: [],
            description: 'Example: [{"id": "createdAt", "desc": true}]',
          },
        },
      },
      info: {
        title: 'Yaso Nabung App Documentation',
        version: '1.0.0',
      },
      paths: docsSources,
    },
    apis: [],
  }

  const swaggerSpec = swaggerDocs(swaggerOptions)

  app.get('/v1/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  const options = {
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          url: '/v1/api-docs.json',
          name: 'API',
        },
      ],
    },
  }

  // app.use('/v1/api-docs', swaggerUI.serve, swaggerUI.setup(null, options))
  const swaggerHTML1 = swaggerUI.generateHTML(swaggerSpec, options)
  app.use('/v1/api-docs', swaggerUI.serveFiles(swaggerHTML1, options))
  app.get('/v1/api-docs', (req, res) => {
    res.send(swaggerHTML1)
  })
}
