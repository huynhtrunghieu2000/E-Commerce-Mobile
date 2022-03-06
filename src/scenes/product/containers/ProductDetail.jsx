import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Box,
  Button,
  HStack,
  Modal,
  ScrollView,
  Slide,
  Spinner,
  Text,
} from 'native-base'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProductById } from '../../../api/product/product.api'
import { addToCart } from '../../cart/cart.slice'
import ImageCrousel from '../../../components/ImageCarousel/ImageCarousel'
import ProductInfo from '../components/ProductInfo'
import { Dimensions } from 'react-native'
import { Factory } from 'native-base'
import { pushNotification } from '../../../components/Notification/notification.slice'

const ProductDetail = () => {
  const { id } = useRoute().params
  const navigation = useNavigation()
  const [product, setProduct] = React.useState(null)
  const [isOpenBottom, setIsOpenBottom] = React.useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    ;(async () => {
      try {
        const res = await getProductById(id)
        setProduct(res.data[0])
      } catch (error) {}
    })()
  }, [])
  return (
    <Box height={'full'}>
      <ScrollView>
        {product ? (
          <>
            <ImageCrousel
              w={Dimensions.get('window').width}
              h={400}
              imageList={product.productImgs}
              imageAlt={product.productName}
            />
            <ProductInfo product={product} />
          </>
        ) : (
          <Box mt={'3/4'}>
            <Spinner size={'lg'} color={'primary.500'} />
          </Box>
        )}
      </ScrollView>
      <Box position={'absolute'} w={'full'} bottom={0}>
        <HStack display={'flex'}>
          {product ? (
            product?.productQty > 0 ? (
              <>
                <Button
                  py={3}
                  borderBottomRadius={0}
                  bgColor={'white'}
                  w={'50%'}
                  onPress={() => {
                    dispatch(
                      addToCart({
                        id: id,
                        quantity: 1,
                        price: product.discountPrice,
                      }),
                    )
                    dispatch(
                      pushNotification({
                        status: 'success',
                        message: 'Added to cart',
                      }),
                    )
                    // setIsOpenBottom(!isOpenBottom)
                  }}
                >
                  <Text fontWeight={'bold'} fontSize={16} color={'primary.500'}>
                    Add To Cart
                  </Text>
                </Button>
                <Button
                  w={'50%'}
                  borderBottomRadius={0}
                  onPress={() => {
                    dispatch(addToCart({
                      id: id, quantity: 1,
                      price: product.discountPrice,
                    }))
                    navigation.navigate('Checkout')
                  }}
                >
                  <Text fontWeight={'bold'} fontSize={16} color={'white'}>
                    Check out
                  </Text>
                </Button>
              </>
            ) : (
              <>
                <Button
                  w={'100%'}
                  backgroundColor={'red.300'}
                  borderBottomRadius={0}
                  onPress={() => {}}
                  disabled
                >
                  <Text fontWeight={'bold'} fontSize={16} color={'white'}>
                    Sold out
                  </Text>
                </Button>
              </>
            )
          ) : (
            <></>
          )}
        </HStack>
      </Box>
      {/* <Modal
        isOpen={isOpenBottom}
        onClose={() => {
          setIsOpenBottom(false)
        }}
        size={'full'}
      >
        <Slide in={isOpenBottom} placement="bottom" duration={250}>
          <Modal.CloseButton />
          <Modal.Content h={400} mt={'auto'} mb={0} backgroundColor={'white'}>
            <Text size={100}>hi</Text>
          </Modal.Content>
        </Slide>
      </Modal> */}
    </Box>
  )
}

export default ProductDetail
