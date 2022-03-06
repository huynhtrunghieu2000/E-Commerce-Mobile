import axiosClient from '../axiosClient'
import axios from 'axios'

export function createOrder(body) {
  return axiosClient.post('/orders', body)
}

export function getOrderByUserId(id) {
  return axiosClient.get(`/orders/getByUserId/${id}`)
}

export function updateOrderInformation(body) {
  return axiosClient.put(`/orders/${body._id}`, body)
}
