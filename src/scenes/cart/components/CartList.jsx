import { Box, FlatList, ScrollView } from 'native-base'
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { getProductById } from '../../../api/product/product.api'
import { useDispatch } from 'react-redux'
import { setTotal } from '../cart.slice'
import { fromCartToListProducts } from '../helpers/cartHelpers'

const CartList = ({ data }) => {
  const [productList, setProductList] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    try {
      ;(async () => {
        const listData = await fromCartToListProducts(data)
        setProductList(listData)
        const total = listData.reduce((total, item) => {
          return (
            total +
            (item.product.discountPrice || item.product.sellingPrice) *
              item.quantity
          )
        }, 0)
        dispatch(setTotal(total))
      })()
    } catch (error) {
      console.log(error)
    }
  }, [data])

  return (
    <Box paddingBottom={10}>
      <ScrollView>
        {productList.length > 0 ? (
          productList.map((item, index) => {
            if (item) {
              return <CartItem key={index} data={item} />
            }
          })
        ) : (
          <></>
        )}
      </ScrollView>
    </Box>
  )
}

export default CartList
