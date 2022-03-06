import axiosClient from '../axiosClient'

export function getCategory() {
  return axiosClient.get('/categories')
}

export function getSubCategory(id) {
  return axiosClient.get(`/categories/${id}`)
}

export function getSubSubCategory(id) {
  return axiosClient.get(`/categories/${id}`)
}
