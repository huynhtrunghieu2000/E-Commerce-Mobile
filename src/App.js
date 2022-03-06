import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { extendTheme, NativeBaseProvider } from 'native-base'
import store from 'utils/store'
import 'utils/ignore'

// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import { colors } from './theme'
// components
import Router from './routes'
import LogIn from 'scenes/auth/containers/LogIn'
import SignUp from 'scenes/auth/containers/SignUp'
import Home from 'scenes/home'
import NotificationProvider from './components/Notification/NotificationProvider'
import { useDispatch } from 'react-redux'
import NetInfo from '@react-native-community/netinfo'
import { pushNotification } from './components/Notification/notification.slice'

const App = () => {
  const dispatch = useDispatch()
  // state
  const [didLoad, setDidLoad] = useState(false)
  const [isConnected, setIsConnected] = useState(NetInfo.isConnected)

  // handler
  const handleLoadAssets = async () => {
    // assets preloading
    await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  // lifecycle
  useEffect(() => {
    handleLoadAssets()
    // Network notification
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected !== isConnected) {
        setIsConnected(state.isConnected)
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!isConnected) {
      dispatch(
        pushNotification({
          status: 'error',
          message: 'Network disconnected',
        }),
      )
    }
  }, [isConnected])

  // theme
  const theme = extendTheme({
    colors,
    components: {
      Input: {
        baseStyle: {},
        defaultProps: {},
        variants: {},
        sizes: {},
      },
    },
  })

  // rendering
  if (!didLoad) return <View />
  return (
    <NativeBaseProvider theme={theme}>
      <NotificationProvider>
        <Router />
      </NotificationProvider>
    </NativeBaseProvider>
  )
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
