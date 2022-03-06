import axiosClient from '../axiosClient'

export function getProduct() {
  return axiosClient.get('/product')
}

export function getProductById(id) {
  return axiosClient.get(`/product/${id}`)
}

export function getProductByCategory(id) {
  return axiosClient.get(`/product/category/${id}`)
}

export function getProductHot() {
  return axiosClient.get('/product/hotProduct')
}

export function searchProduct(keyword) {
  return axiosClient.get(`/product/search/${keyword}`)
}
