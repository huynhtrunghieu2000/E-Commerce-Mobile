import { Box } from 'native-base'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteNotification,
  pushNotification,
  showNotification,
} from './notification.slice'
import NotificationBox from './NotificationBox'

const NotificationProvider = (props) => {
  const dispatch = useDispatch()
  const notificationState = useSelector((state) => state.notification)
  const notificationQueue = notificationState.notificationQueue
  const notification = notificationState.currentNotification

  useEffect(() => {
    if (notificationQueue.length > 0) {
      !notification?.status && dispatch(showNotification())
    }
  }, [notificationQueue])

  useEffect(() => {
    if (notification?.status) {
      const hideNotification = setTimeout(() => {
        dispatch(deleteNotification())
      }, 3000)
      return () => {
        clearTimeout(hideNotification)
      }
    } else {
      if (notificationQueue.length > 0) {
        dispatch(showNotification())
      }
    }
  }, [notification])
  return (
    <Box w={'full'} h={'full'}>
      {props.children}
      {notification?.status && (
        <NotificationBox
          message={notification.message}
          status={notification.status}
        />
      )}
    </Box>
  )
}

export default NotificationProvider
