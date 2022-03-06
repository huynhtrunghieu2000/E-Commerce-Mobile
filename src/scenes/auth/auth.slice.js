import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from '@reduxjs/toolkit'
import { login, register } from '../../api/auth/auth.api'
import { AuthStorageService } from '../../api/auth/authStorage'
import { deleteMe, saveMe } from '../../slices/app.slice'
// Initial State
const initialState = {
  isLoading: false,
  isLoggedIn: false,
  data: null,
  error: null,
}
const authStorage = new AuthStorageService()
// Thunk action
export const loginAction = createAsyncThunk(
  'auth/login',
  async (payload, thunkApi) => {
    try {
      const { username, password } = payload
      const res = await login(username, password)
      const { accessToken, ...userInfo } = res.data
      thunkApi.dispatch(saveMe(userInfo))
      await authStorage.setToken(accessToken)
      return userInfo
    } catch (err) {
      return thunkApi.rejectWithValue(err.data)
    }
  },
)

export const signUpAction = createAsyncThunk(
  'auth/register',
  async (payload, thunkApi) => {
    console.log('payload', payload)
    try {
      const res = await register(payload)
      return res
    } catch (err) {
      return thunkApi.rejectWithValue(err.data)
    }
  },
)

export const logOut = createAsyncThunk(
  'auth/logout',
  async (payload, thunkApi) => {
    await authStorage.removeToken()
    thunkApi.dispatch(deleteMe())
  },
)

// Reducer function
const authStart = (state) => {
  state.isLoading = true
}

const loginSuccess = (state, action) => {
  state.isLoading = false
  state.isLoggedIn = true
  state.data = action.payload
}

const loginError = (state, action) => {
  state.isLoading = false
  state.error = action
}

// Slice
const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false
      state.isLoggedIn = false
      state.data = null
      state.error = null
    },
  },
  extraReducers: {
    [login.pending]: authStart,
    [login.fulfilled]: loginSuccess,
    [login.rejected]: loginError,
    [register.pending]: authStart,
    [register.fulfilled]: loginSuccess,
    [register.rejected]: loginError,
  },
})

const { actions, reducer: authReducer } = authSlices
export const { resetAuth } = actions

export default authReducer
