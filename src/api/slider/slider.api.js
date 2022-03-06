import axiosClient from '../axiosClient'

export function getSlider() {
  return axiosClient.get('/sliders')
}
