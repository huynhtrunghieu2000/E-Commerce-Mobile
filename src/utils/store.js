import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import appReducer from 'slices/app.slice'
import notificationReducer from '../components/Notification/notification.slice'
import cartReducer from '../scenes/cart/cart.slice'

const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  notification: notificationReducer,
  // add more reducers
})

const defaultMiddleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
})

const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line no-undef
  middleware: __DEV__ ? defaultMiddleware.concat(logger) : defaultMiddleware,
})

export default store
