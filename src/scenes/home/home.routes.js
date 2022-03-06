import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'
const Stack = createStackNavigator()

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerTitleAlign: 'center' }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default HomeNavigator
