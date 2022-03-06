import axios from 'axios'
import { AuthStorageService } from './authStorage'

const authClient = axios.create({
  baseURL: `https://elnic.herokuapp.com/api/auth/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const authStorage = new AuthStorageService()
authClient.interceptors.request.use(async function (config) {
  // Do something before request is sent

  let authKey = await authStorage.getToken()
  if (authKey) {
    config.headers['Authorization'] = 'Bearer ' + authKey
  }
  return config
})

authClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // Make error model before promise
    if (error.isAxiosError && error.response) {
      // Axios error
      const res = error.response
      console.error(`Error ${res.status}`)
      return Promise.reject(res)
    } else {
      // Default | Network errors | CORS | ...
      return Promise.reject(error)
    }
  },
)

export function login(email, password) {
  console.log('axios', { username: email, password })
  return authClient.post('signin', {
    username: email,
    password,
  })
}

export function register(body) {
  return authClient.post('signup', body)
}

export function logout() {
  return authClient.post('logout')
}
