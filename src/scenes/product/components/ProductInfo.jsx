import { Badge, Box, Divider, Flex, Heading, Text } from 'native-base'
import React from 'react'
import { toVietnamesePrice } from '../../../helpers/price-convert'

const ProductInfo = ({ product }) => {
  return (
    <Box px={'2'}>
      <Heading size={'xl'}>{product.productName}</Heading>
      <Text
        color={'muted.500'}
        fontSize={'md'}
        fontWeight={'semibold'}
        strikeThrough
      >
        {toVietnamesePrice(product.sellingPrice)}
      </Text>
      <Text
        lineHeight={21}
        color={'primary.500'}
        fontSize={'xl'}
        fontWeight={'semibold'}
        mb={'2'}
      >
        {toVietnamesePrice(product.discountPrice)}
      </Text>
      <Divider h={'1'} mb={5} />
      <Flex direction="row" alignItems="center" mb={5}>
        <Text mr={1}>Quantity in Storage: {product.productQty}</Text>
        {product.productQty <= 0 ? (
          <Badge colorScheme="danger">Sold out</Badge>
        ) : null}
      </Flex>
      <Text fontSize={'md'}>{product.longDescp}</Text>
    </Box>
  )
}

export default ProductInfo
