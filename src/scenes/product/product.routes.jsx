import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import ProductDetail from './containers/ProductDetail'

const Stack = createStackNavigator()
const ProductNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Product">
      <Stack.Screen name="Product" component={ProductDetail} />
    </Stack.Navigator>
  )
}

export default ProductNavigator
