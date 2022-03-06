import { getProductById } from '../../../api/product/product.api'

export const fromCartToListProducts = async (cart) => {
  let listData = []
  for (let item of cart) {
    const res = await getProductById(item.id)
    listData = [...listData, { product: res.data[0], quantity: item.quantity }]
  }
  return listData
}
