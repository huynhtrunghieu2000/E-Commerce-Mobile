import axiosClient from '../axiosClient'

export function getCoupon() {
  return axiosClient.get('/coupon')
}
