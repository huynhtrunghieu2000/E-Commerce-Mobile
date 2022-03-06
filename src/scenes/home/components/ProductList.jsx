import React from 'react'
import { Box, Flex, HStack, ScrollView, Spacer } from 'native-base'
import Product from './Product'
const ProductList = ({ data }) => {
  return (
    <Flex wrap="wrap" direction="row" justify={'space-between'} p={1}>
      {data.map((item, index) => {
        return <Product key={index} data={item} />
      })}
    </Flex>
  )
}

export default ProductList
