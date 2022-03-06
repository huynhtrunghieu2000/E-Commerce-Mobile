import { Box, ScrollView, Text } from 'native-base'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getOrderByUserId } from '../../../api/order/order.api'
import OrderItem from '../components/OrderItem'

const Order = () => {
  const me = useSelector((state) => state.app.me)
  const [orders, setOrders] = React.useState([])

  useEffect(() => {
    ;(async () => {
      if (me.id) {
        const res = await getOrderByUserId(me.id)
        setOrders(res.data)
        console.log(res.data)
      }
    })()
    return () => {
      setOrders([])
    }
  }, [])

  return (
    <ScrollView px={'25px'}>
      {me.id ? (
        orders.length > 0 ? (
          orders
            .reverse()
            .map((order) => <OrderItem order={order} key={order._id} />)
        ) : (
          <Text color={'muted.500'} textAlign={'center'} fontSize={'lg'} mt={2}>
            You haven't made any order yet.
          </Text>
        )
      ) : (
        <Text color={'red.500'} textAlign={'center'} fontSize={'lg'} mt={2}>
          You are not logged in
        </Text>
      )}
    </ScrollView>
  )
}

export default Order
