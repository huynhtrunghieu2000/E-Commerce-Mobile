import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CartService } from './helpers/cartStorage'

const cartService = new CartService()
// Initial State
const initialState = {
  isLoading: false,
  data: [],
  total: 0,
  error: null,
}
// Thunk action
export const updateCart = createAsyncThunk(
  'cart/update',
  async (payload, thunkApi) => {
    const { cart } = payload
    await cartService.updateCart(cart)
    return cart
  },
)
// Slice
const cartSlices = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.data = action.payload
    },
    setTotal: (state, action) => {
      state.total = action.payload
    },
    addToCart: (state, action) => {
      console.log('addToCart', action.payload.id)
      const item = state.data.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity += 1
      } else {
        state.data.push(action.payload)
      }
      state.total += action.payload.price
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload)
    },
    increaseQuantity: (state, action) => {
      const item = state.data.find((item) => item.id === action.payload)
      item.quantity += 1
    },
    decreaseQuantity: (state, action) => {
      const item = state.data.find((item) => item.id === action.payload)
      item.quantity -= 1
    },
    clearCart: (state) => {
      state.data = []
      state.total = 0
    },
  },
  extraReducers: {
    // [update.pending]: authStart,
    // [update.fulfilled]: setCart,
    // [update.rejected]: loginError,
  },
})

const { reducer: cartReducer } = cartSlices
export const {
  setCart,
  setTotal,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlices.actions

export default cartReducer
