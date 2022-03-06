import AsyncStorage from '@react-native-async-storage/async-storage'

export class PaymentService {
  PAYMENT = 'payment'
  async setPayment(payment) {
    if (payment) {
      try {
        await AsyncStorage.setItem(this.PAYMENT, JSON.stringify(payment))
      } catch (error) {
        console.error(error)
      }
    }
  }

  async getPayment() {
    try {
      const payment = await AsyncStorage.getItem(this.PAYMENT)
      if (payment) {
        return JSON.parse(payment)
      }
    } catch (error) {
      console.error(error)
    }
    return null
  }

  async removePayment() {
    try {
      await AsyncStorage.removeItem(this.PAYMENT)
    } catch (error) {
      console.error(error)
    }
  }
}
