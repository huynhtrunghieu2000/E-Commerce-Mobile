/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

// ------------------------------------
// Constants
// ------------------------------------

const initialState = {
  notificationQueue: [],
  showNotification: false,
  currentNotification: {},
}

// ------------------------------------
// Slice
// ------------------------------------

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    pushNotification: (state, { payload }) => {
      state.notificationQueue.push(payload)
    },
    showNotification: (state) => {
      state.showNotification = true
      state.currentNotification = state.notificationQueue.shift()
    },
    deleteNotification: (state) => {
      state.showNotification = false
      state.currentNotification = {}
    },
  },
})

export const { action } = notificationSlice
export const { pushNotification, showNotification, deleteNotification } =
  notificationSlice.actions

export default notificationSlice.reducer
