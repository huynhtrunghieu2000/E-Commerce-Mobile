import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Cart from './containers/Cart'

const Stack = createStackNavigator()
const CartNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={{ headerTitleAlign: 'center' }}
    >
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  )
}

export default CartNavigator
