import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from './containers/Profile'
import Payment from './containers/Payment'
import Order from './containers/Order'

const Stack = createStackNavigator()
const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerTitleAlign: 'center' }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
