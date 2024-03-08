const http = require('http')
const env = require('./config/env.config')
const { App } = require('./config/app.config')
const { httpHandle } = require('./modules/http/http')

require('@babel/register')({ extensions: ['.js', '.ts'] })

function bootstrap() {
  const port = env.APP_PORT

  // create express app
  const app = new App().create()

  const server = http.createServer(app)

  const { onError, onListening } = httpHandle(server, port)

  // run server listen
  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
}

bootstrap()
