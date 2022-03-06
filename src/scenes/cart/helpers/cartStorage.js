import AsyncStorage from '@react-native-async-storage/async-storage'

export class CartService {
  CART = 'cart'
  async setCart(cart) {
    if (cart) {
      try {
        await AsyncStorage.setItem(this.CART, JSON.stringify(cart))
      } catch (error) {
        console.error(error)
      }
    }
  }

  async getCart() {
    try {
      const cart = await AsyncStorage.getItem(this.CART)
      if (cart) {
        return JSON.parse(cart)
      }
    } catch (error) {
      console.error(error)
    }
    return null
  }

  async removeCart() {
    try {
      await AsyncStorage.removeItem(this.CART)
    } catch (error) {
      console.error(error)
    }
  }
}
