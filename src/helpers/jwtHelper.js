import * as jwt from 'jsonwebtoken'
import { AuthStorageService } from '../api/auth/authStorage'

export default class JwtHelper extends AuthStorageService {
  defaultHeader = () => ({
    // TODO: make default jwt header
  })

  getAuthHeader = async () => ({
    Authorization: `Bearer ${this.getToken()}`,
  })

  isValidToken() {
    return this._verifyJWTToken().isTokenValid
  }

  isAuthenticated() {
    const { isTokenValid } = this._verifyJWTToken()
    return isTokenValid
  }

  isCurrentUser(uid) {
    const userInfo = this.getUserInfo()
    return userInfo ? uid === userInfo.uid : false
  }

  userRole() {
    const userInfo = this.getUserInfo()
    return userInfo ? userInfo.role : undefined
  }

  getUserInfo() {
    const { isTokenValid, token } = this._verifyJWTToken()
    if (isTokenValid) {
      return jwt.decode(token).data
    } else {
      return null
    }
  }

  _verifyJWTToken() {
    const token = this.getToken()
    const isTokenValid = jwt.decode(token)
    if (!isTokenValid) {
      this.removeToken()
    }
    return { isTokenValid, token }
  }
}
