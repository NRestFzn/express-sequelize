const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const swaggerJSDoc = require('swagger-jsdoc')
const env = require('../config/env.config')
const { BASE_URL_SERVER } = require('../constants/BaseUrl')

const baseRouteDocs = path.resolve(`${__dirname}/../docs/routes`)
const baseSchemaDocs = path.resolve(`${__dirname}/../docs/schemas`)

function getDocsSwaggers(_path) {
  return fs.readdirSync(_path).reduce((acc, file) => {
    const data = require(`${_path}/${file}`)
    acc = { ...acc, ...data }

    return acc
  }, {})
}

const docsRoutes = getDocsSwaggers(baseRouteDocs)
const docsSchemas = getDocsSwaggers(baseSchemaDocs)

const baseURLServer = [
  {
    url: `${BASE_URL_SERVER}/v1`,
    description: `${env.NODE_ENV} Server`,
  },
]

const swaggerOptURL = [
  {
    url: `${BASE_URL_SERVER}/v1/api-docs.json`,
    name: `${env.NODE_ENV} Server`,
  },
]

const swaggerOptions = {
  definition: {
    info: {
      title: `Api ${env.APP_NAME} Docs`,
      description: `This is Api Documentation ${env.APP_NAME}`,
      version: '1.0.0',
    },
    openapi: '3.0.1',
    servers: baseURLServer,
    // Set GLOBAL
    // security: [
    //   {
    //     auth_token: []
    //   }
    // ],
    components: {
      securitySchemes: {
        auth_token: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description:
            'JWT Authorization header using the JWT scheme. Example: “Authorization: JWT {token}”',
        },
      },
      schemas: docsSchemas,
      parameters: {
        page: {
          in: 'query',
          name: 'page',
          schema: { type: 'string' },
          required: false,
        },
        pageSize: {
          in: 'query',
          name: 'pageSize',
          schema: { type: 'string' },
          required: false,
        },
        filtered: {
          in: 'query',
          name: 'filtered',
          schema: { type: 'string' },
          required: false,
          description: 'example: [{"id": "email", "value": "anyValue"}]',
        },
        sorted: {
          in: 'query',
          name: 'sorted',
          schema: { type: 'string' },
          required: false,
          description: 'example: [{"sort": "created_at", "order": "DESC"}]',
        },
      },
    },
    paths: docsRoutes,
  },
  apis: [],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
const optionsSwaggerUI = {
  explorer: true,
  swaggerOptions: { urls: swaggerOptURL },
}

module.exports = {
  swaggerOptions,
  swaggerSpec,
  optionsSwaggerUI,
}
