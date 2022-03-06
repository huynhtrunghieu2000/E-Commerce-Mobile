import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'native-base'
import React from 'react'
import Cart from 'scenes/cart/containers/Cart'
import CartNavigator from '../../../scenes/cart/Cart.Routes'
// import HomeNavigator from '../../../scenes/home'
import Home from '../../../scenes/home/Home'
import HomeNavigator from '../../../scenes/home/home.routes'
import Profile from '../../../scenes/profile/containers/Profile'
import ProfileNavigator from '../../../scenes/profile/Profile.Routes'

const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTitleAlign: 'center',
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#fff',
      tabBarActiveBackgroundColor: '#38972E',
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused, color, size }) => {
          return focused ? (
            <Icon as={AntDesign} color={'white'} size={size} name="home" />
          ) : (
            <Icon as={AntDesign} color={color} size={size} name="home" />
          )
        },
      }}
    />
    <Tab.Screen
      name="Cart"
      component={Cart}
      options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Icon
              as={AntDesign}
              color={color}
              size={size}
              name="shoppingcart"
            />
          )
        },
      }}
    />
    <Tab.Screen
      name="ProfileNavigator"
      component={ProfileNavigator}
      options={{
        tabBarIcon: ({ focused, color, size }) => {
          return <Icon as={AntDesign} color={color} size={size} name="user" />
        },
        headerShown: false,
      }}
    />
  </Tab.Navigator>
)

export default TabNavigator
