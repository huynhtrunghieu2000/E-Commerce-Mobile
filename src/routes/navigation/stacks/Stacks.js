import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AuthNavigator from '../../../scenes/auth/auth.routes'
import CheckOut from '../../../scenes/checkout/containers/CheckOut'
import ProductDetail from '../../../scenes/product/containers/ProductDetail'
import ProductNavigator from '../../../scenes/product/product.routes'
import ProfileNavigator from '../../../scenes/profile/Profile.Routes'
import TabNavigator from '../tabs/Tabs'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

const navigationProps = {
  // headerTintColor: 'black',
  // headerStyle: { backgroundColor: colors.darkPurple },
  // headerTitleStyle: { fontSize: 18 },
  headerShown: true,
  headerTitleAlign: 'center',
}

// ------------------------------------
// Navigators
// ------------------------------------
export const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Main" screenOptions={navigationProps}>
    <Stack.Screen
      name="Main"
      component={TabNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Auth"
      component={AuthNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Product" component={ProductDetail} />
    <Stack.Screen
      name="Checkout"
      component={CheckOut}
      options={{ headerShown: true, headerTitleAlign: 'center' }}
    />
  </Stack.Navigator>
)
