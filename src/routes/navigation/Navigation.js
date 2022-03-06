import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import DrawerNavigator from './drawer'
import AuthNavigators from '../../scenes/auth/auth.routes'
import { StackNavigator } from './stacks/Stacks'
import { useDispatch } from 'react-redux'
import { pushNotification } from '../../components/Notification/notification.slice'

export default () => {
  const linking = {
    prefixes: ['exp://127.0.0.1:19000'],
    config: {
      screens: {
        Auth: {
          path: 'auth',
          screens: {
            Login: 'login',
            SignUp: 'signup',
          },
        },
        Home: {
          path: '',
        },
        Product: {
          path: 'product',
          screens: {
            Product: ':id',
          },
        },
        ProfileNavigator: {
          path: 'profile',
          screens: {
            Profile: '',
            Order: 'order',
            Payment: 'payment',
          },
        },
        Cart: {
          path: 'cart',
        },
        Checkout: {
          path: 'checkout',
        },
      },
    },
  }

  return (
    <NavigationContainer linking={linking}>
      <StackNavigator />
    </NavigationContainer>
  )
}
