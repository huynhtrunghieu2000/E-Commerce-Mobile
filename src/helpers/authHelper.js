import { AxiosRequestConfig } from 'axios'
import JwtHelper from './jwtHelper'

const strategies = {
  JWT: JwtHelper,
  __default__: JwtHelper,
}

class DynamicAuth {
  [x]

  constructor(type) {
    const currentAuth = strategies[type]
    Object.setPrototypeOf(DynamicAuth.prototype, new currentAuth())
  }
}

// tslint:disable-next-line: max-classes-per-file
export default class AuthHelper extends DynamicAuth {
  constructor(type = 'JWT') {
    super(type)
  }

  defaultHeader() {
    if (super.defaultHeader) {
      return super.defaultHeader()
    }
    // default code here
  }

  getAuthHeader() {
    if (super.getAuthHeader) {
      return super.getAuthHeader()
    }
    // default code here
  }

  isValidToken() {
    /**
     * Adding conditions here
     */
    // TODO
    if (super.isValidToken) {
      return super.isValidToken()
    }
    // default code here
  }

  setAuthHeader(request) {
    // Get and check access token
    if (this.getToken()) {
      // Check `access token` condition
      if (!this.isValidToken()) {
        return this.handleRefreshToken(request)
      }
      // Normal case: Request with authorization
      Object.assign(request.headers, this.getAuthHeader())
    }
    return request
  }

  handleRefreshToken(request) {
    // TODO: handle refresh token
    return null
  }
}
