import env from 'config/env.config'
import { blue, green, cyan } from 'colorette'

const httpHandle = (server, port) => {
  /**
   * On Error
   */
  const onError = (error) => {
    if (error.syscall !== 'listen') {
      throw new Error()
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`)
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`)
        process.exit(1)
        break
      default:
        throw new Error()
    }
  }

  /**
   * On Listenting HTTP
   */
  const onListening = () => {
    const addr = server.address()
    const bind = typeof addr === 'string' ? `${addr}` : `${addr?.port}`

    const host = cyan(`http://localhost:${bind}`)
    const nodeEnv = blue(env.NODE_ENV)

    const msgType = green(`${env.APP_NAME}`)
    const message = `server listening on ${host} ⚡️ & env: ${nodeEnv} 🚀`

    console.log(`${msgType} - ${message}`)
  }

  return { onError, onListening }
}

module.exports = {
  httpHandle,
}
