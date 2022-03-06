import { Badge, Box, Flex, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import CachedImage from 'react-native-expo-cached-image'
import { getProductById } from '../../../api/product/product.api'
import { toVietnamesePrice } from '../../../helpers/price-convert'

const OrderItem = ({ order }) => {
  const [firstProduct, setFirstProduct] = useState(null)
  const numsOfItems = order.productList.length
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const orderDate = new Date(order.orderDate)
  useEffect(() => {
    ;(async () => {
      try {
        const res = await getProductById(order.productList[0]._id)
        setFirstProduct(res.data[0])
      } catch (error) {}
    })()
  }, [])

  return (
    <Flex
      direction="row"
      justifyContent={'space-between'}
      px={5}
      py={2}
      // shadow={0}
      borderWidth={1}
      borderColor={'muted.200'}
      borderRadius={5}
      mt={5}
    >
      <Flex direction="column" alignItems={'center'} flex={1}>
        <Text>{orderDate.getFullYear()}</Text>
        <Text
          color={'primary.500'}
          fontWeight={'bold'}
          fontSize={'xl'}
          lineHeight={'sm'}
        >
          {orderDate.getDate()}
        </Text>
        <Text>{month[orderDate.getUTCMonth()]}</Text>
      </Flex>
      <Flex flex={4} ml={3} direction="column" justifyContent={'space-between'}>
        <Flex direction="row" alignItems={'center'}>
          <Text fontWeight={'bold'} fontSize={'xl'} lineHeight={'sm'} mr={1}>
            Order
          </Text>
          <Badge colorScheme={order.status ? 'green' : 'red'} borderRadius={5}>
            {order.status ? 'Payed' : 'Not pay yet'}
          </Badge>
        </Flex>

        <Text
          color={'muted.500'}
          fontWeight={'bold'}
          fontSize={'sm'}
          lineHeight={'sm'}
        >
          #{order._id}
        </Text>
        <Text fontWeight={'semibold'} fontSize={'lg'} lineHeight={'sm'}>
          Total:
          <Text color={'primary.500'}>{toVietnamesePrice(order.amount)}</Text>
        </Text>
      </Flex>
      <Box flex={1}>
        <CachedImage
          style={{ width: 70, height: 70 }}
          source={{ uri: firstProduct?.productThambnail }}
        />
      </Box>
    </Flex>
  )
}

export default OrderItem
