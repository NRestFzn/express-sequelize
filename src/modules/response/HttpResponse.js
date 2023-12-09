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
    const message = 'success.data_received'

    return this.baseResponse({ message, ...dataResponse })
  }

  static created(dataResponse, options) {
    const message = 'success.data_added'

    return this.baseResponse({ code: 201, message, ...dataResponse })
  }

  static updated(dataResponse, options) {
    const message = 'success.data_updated'

    return this.baseResponse({ message, ...dataResponse })
  }

  static deleted(dataResponse, options) {
    const message = 'success.data_deleted'

    return this.baseResponse({ message, ...dataResponse })
  }
}

module.exports = HttpResponse
