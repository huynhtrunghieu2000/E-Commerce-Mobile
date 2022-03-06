import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'
import Main from './navigation'

const Routes = () => {
  return <Main />
}

export default Routes
