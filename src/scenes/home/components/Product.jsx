import { useLinkTo } from '@react-navigation/native'
import { Box, Image, Pressable, Text, Center, Badge, Flex } from 'native-base'
import React from 'react'
import { toVietnamesePrice } from '../../../helpers/price-convert'
import CachedImage from 'react-native-expo-cached-image'

const Product = ({ data }) => {
  const linkTo = useLinkTo()
  return (
    <Box
      // shadow={0}
      // elevation={1}
      borderWidth={1}
      borderColor={'muted.200'}
      w={'48%'}
      style={{ aspectRatio: 9 / 16 }}
      borderRadius={'xl'}
      mb={'4'}
    >
      <Pressable
        onPress={() => {
          linkTo(`/product/${data._id}`)
        }}
      >
        <Flex alignItems={'center'} mt={1} w={'100%'} h={'70%'}>
          {/* <Image
            source={{
              uri: data.productThambnail,
            }}
            fallbackElement={<Text>Loading...</Text>}
            alt="Product"
            w={'97%'}
            h={'100%'}
            borderTopRadius={'xl'}
            resizeMode="contain"
          /> */}
          <CachedImage
            source={{
              uri: data.productThambnail,
            }}
            style={{
              width: '97%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </Flex>
        <Box padding={1} alignItems={'center'}>
          <Text fontSize={17} fontWeight={'semibold'} numberOfLines={1}>
            {data.productName}
          </Text>
          <Text
            color={'muted.500'}
            fontSize={13}
            fontWeight={'semibold'}
            strikeThrough
          >
            {toVietnamesePrice(data.sellingPrice)}
          </Text>
          <Text
            lineHeight={17}
            color={'primary.500'}
            fontSize={17}
            fontWeight={'semibold'}
          >
            {toVietnamesePrice(data.discountPrice)}
          </Text>
        </Box>
        {data.sellingPrice !== data.discountPrice && (
          <Center
            background={'primary.500'}
            width={'10'}
            borderRadius={'md'}
            position={'absolute'}
            top={'10px'}
            left={'10px'}
          >
            <Text color={'white'}>
              {((data.discountPrice / data.sellingPrice - 1) * 100).toFixed(0)}%
            </Text>
          </Center>
        )}
        {data.productQty === 0 && (
          <Badge
            colorScheme="danger"
            position={'absolute'}
            top={2}
            right={-2}
            borderLeftRadius={8}
          >
            Sold out
          </Badge>
        )}
      </Pressable>
    </Box>
  )
}

export default Product
