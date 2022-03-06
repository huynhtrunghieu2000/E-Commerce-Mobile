import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Pressable,
  Text,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../cart.slice'
import { toVietnamesePrice } from '../../../helpers/price-convert'
import { useLinkTo } from '@react-navigation/native'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import CachedImage from 'react-native-expo-cached-image'
const CartItem = ({ data }) => {
  const linkTo = useLinkTo()
  const { product, quantity } = data
  const dispatch = useDispatch()
  return (
    <Flex direction="row" justifyContent={'space-between'} mx={5} mb={5}>
      <Box
        flex={1}
        p={2}
        backgroundColor={'white'}
        shadow={0}
        mr={1}
        borderRadius={10}
      >
        <Pressable
          onPress={() => {
            linkTo(`/product/${product._id}`)
          }}
        >
          <Flex direction="row" justifyContent={'space-between'}>
            {/* <Image
              source={{
                uri: product.productThambnail,
              }}
              fallbackElement={<Text>Loading...</Text>}
              alt="Product"
              w={100}
              h={100}
              resizeMode="cover"
            /> */}
            <CachedImage
              source={{
                uri: product.productThambnail,
              }}
              style={{
                width: 100,
                height: 100,
                resizeMode: 'cover',
              }}
            />
            <Box ml={2} flex={1}>
              <Heading size={'md'} numberOfLines={1}>
                {product.productName}
              </Heading>
              <Text
                color={'muted.500'}
                fontSize={'sm'}
                fontWeight={'semibold'}
                strikeThrough
              >
                {toVietnamesePrice(product.sellingPrice)}
              </Text>
              <Text
                lineHeight={21}
                color={'primary.500'}
                fontSize={'lg'}
                fontWeight={'semibold'}
                mb={'2'}
              >
                {toVietnamesePrice(product.discountPrice)}
              </Text>
            </Box>
          </Flex>
        </Pressable>
        <Flex
          position={'absolute'}
          bottom={2}
          right={2}
          direction="row"
          alignItems={'center'}
          borderWidth={1}
          borderColor={'muted.300'}
          borderRadius={5}
        >
          <Button
            onPress={() => {
              dispatch(decreaseQuantity(product._id))
            }}
            background={'transparent'}
            px={2}
            borderRadius={0}
            borderRightWidth={1}
            borderColor={'muted.300'}
          >
            <Icon name="minus" as={FontAwesome} size={3} />
          </Button>
          <Text fontSize={18} px={2}>
            {quantity}
          </Text>
          <Button
            onPress={() => {
              dispatch(increaseQuantity(product._id))
            }}
            background={'transparent'}
            px={2}
            borderRadius={0}
            borderLeftWidth={1}
            borderColor={'muted.300'}
          >
            <Icon name="plus" as={FontAwesome} size={3} />
          </Button>
        </Flex>
      </Box>
      <Center px={1} backgroundColor={'red.400'} shadow={0} borderRadius={10}>
        <Pressable
          onPress={() => {
            dispatch(removeFromCart(product._id))
          }}
        >
          <Icon
            w={'full'}
            h={'full'}
            as={AntDesign}
            name="delete"
            color={'white'}
            size={6}
          />
        </Pressable>
      </Center>
    </Flex>
  )
}

export default CartItem
