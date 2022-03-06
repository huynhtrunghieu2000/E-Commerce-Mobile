import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { AuthStorageService } from './auth/authStorage'

const axiosClient = axios.create({
  baseURL: `https://elnic-api.herokuapp.com/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const authStorage = new AuthStorageService()
axiosClient.interceptors.request.use(async function (config) {
  // Do something before request is sent
  let authKey = await authStorage.getToken()
  config.headers['Authorization'] = 'Bearer ' + authKey
  return config
})

axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // Make error model before promise
    if (error.isAxiosError && error.response) {
      // Axios error
      const res = error.response
      console.error('Error status: ', res.status)
      return Promise.reject(res)
    } else {
      // Default | Network errors | CORS | ...
      return Promise.reject(error)
    }
  },
)

export default axiosClient
