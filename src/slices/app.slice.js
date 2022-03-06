/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { COD } from '../constants/payment-type'

// ------------------------------------
// Constants
// ------------------------------------

const initialState = {
  me: {},
  isNetworkConnected: true,
  paymentMethod: COD,
}

// ------------------------------------
// Slice
// ------------------------------------

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    saveMe: (state, { payload }) => {
      state.me = payload
    },
    deleteMe: (state) => {
      state.me = {}
    },
    setPaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload
    }
  },
})

export const { action } = appSlice
export const { saveMe, deleteMe ,setPaymentMethod} = appSlice.actions

export default appSlice.reducer
