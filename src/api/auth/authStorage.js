import AsyncStorage from '@react-native-async-storage/async-storage'

export class AuthStorageService {
  ACCESS_TOKEN = 'token'

  async setToken(token) {
    if (token) {
      try {
        await AsyncStorage.setItem(this.ACCESS_TOKEN, token)
      } catch (error) {
        console.error(error)
      }
    }
  }

  async getToken() {
    try {
      return await AsyncStorage.getItem(this.ACCESS_TOKEN)
    } catch (error) {
      console.error(error)
    }
    return null
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem(this.ACCESS_TOKEN)
    } catch (error) {
      console.error(error)
    }
  }
}
