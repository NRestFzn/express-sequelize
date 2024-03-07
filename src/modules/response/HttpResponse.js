class HttpResponse {
  static baseResponse(dataResponse) {
    const {
      message = 'data has been received',
      code = 200,
      ...rest
    } = dataResponse

    return { code, message, ...rest }
  }

  static get(dataResponse, options) {
    const message = 'data received'

    return this.baseResponse({ message, ...dataResponse })
  }

  static created(dataResponse, options) {
    const message = 'data successfully added'

    return this.baseResponse({ code: 201, message, ...dataResponse })
  }

  static updated(dataResponse, options) {
    const message = 'data successfully updated'

    return this.baseResponse({ message, ...dataResponse })
  }

  static deleted(dataResponse, options) {
    const message = 'data successfully deleted'

    return this.baseResponse({ message, ...dataResponse })
  }
}

module.exports = HttpResponse
