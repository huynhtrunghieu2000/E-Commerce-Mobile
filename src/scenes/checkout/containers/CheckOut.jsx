import { AntDesign } from '@expo/vector-icons'
import {
  useLinkTo,
  useRoute,
  useNavigation,
  StackActions,
  CommonActions,
} from '@react-navigation/native'
import {
  Box,
  Text,
  Button,
  Heading,
  Flex,
  Image,
  ScrollView,
  Input,
  Radio,
  Spinner,
  Modal,
  Alert,
  VStack,
  Pressable,
  IconButton,
  AlertDialog,
  Slide,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as WebBrowser from 'expo-web-browser'
import {
  checkOutPaypal,
  createOrder,
  updateOrderInformation,
} from '../../../api/order/order.api'
import { COD, PAYPAL } from '../../../constants/payment-type'
import { toVietnamesePrice } from '../../../helpers/price-convert'
import { clearCart } from '../../cart/cart.slice'
import { fromCartToListProducts } from '../../cart/helpers/cartHelpers'
import * as Linking from 'expo-linking'
import { WebView } from 'react-native-webview'

const CheckOut = () => {
  const linkTo = useLinkTo()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.app.me)
  if (!user.username) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            state: {
              routes: [{ name: 'Cart' }],
            },
          },
          {
            name: 'Auth',
          },
        ],
      }),
    )
  }

  const cart = useSelector((state) => state.cart)
  const paymentMethod = useSelector((state) => state.app.paymentMethod)
  const [productList, setProductList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isBrowserOpen, setIsBrowserOpen] = useState(false)
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
  const [paymentDetail, setPaymentDetail] = useState({})
  const [orderSuccessId, setOrderSuccessId] = useState(null)
  const totalPrice = cart.total
  const redirectUrl = Linking.createURL('checkout')

  useEffect(() => {
    if (isBrowserOpen) {
      Linking.addEventListener('url', (event) => {
        const queryParams = Linking.parse(event.url).queryParams
        if (queryParams.paymentId) {
          setPaymentDetail(queryParams)
        }
        setIsBrowserOpen(false)
      })
      return () => {
        Linking.removeEventListener('url')
        setIsBrowserOpen(false)
      }
    }
  }, [isBrowserOpen])

  useEffect(() => {
    if (paymentDetail.paymentId) {
      Linking.removeEventListener('url')
      setIsPaymentSuccess(true)
    } else {
      setIsPaymentSuccess(false)
      setIsError(true)
    }
    setIsPaymentProcessing(false)
  }, [paymentDetail])

  // Update payment detail if success for paypal
  useEffect(() => {
    if (orderSuccessId && isPaymentSuccess && paymentMethod === PAYPAL) {
      ;(async () => {
        try {
          const res = await updateOrderInformation({
            _id: orderSuccessId,
            status: true,
          })
          setIsSuccess(true)
          setIsPaymentProcessing(false)
          dispatch(clearCart())
        } catch (error) {
          console.error(error)
        }
      })()
    }
  }, [orderSuccessId, isPaymentSuccess])

  // set list checkout when cart change
  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      if (cart?.data) {
        const listData = await fromCartToListProducts(cart.data)
        setProductList(listData)
      }
    })()
    setIsLoading(false)
    return () => {
      setIsLoading(false)
    }
  }, [cart])

  // Check out handler
  const checkOut = async () => {
    const productOrder = cart.data.map((item) => {
      return {
        _id: item.id,
        userQuantity: item.quantity,
      }
    })
    const checkOutInfo = {
      ...user,
      phone: '0987654321',
      productList: [...productOrder],
      amount: totalPrice,
      paymentMethod,
    }
    delete checkOutInfo.roles
    delete checkOutInfo.id

    try {
      setIsPaymentProcessing(true)
      const res = await createOrder(checkOutInfo).then(async (res) => {
        setOrderSuccessId(res.data._id)
        if (paymentMethod === PAYPAL && res?.data) {
          // let result = await WebBrowser.openBrowserAsync(

          // ).then((res) => {
          setIsBrowserOpen(true)
          // })
          // sb-35oma8838701@personal.example.com
          // Huynhhieu123
        } else {
          setIsSuccess(true)
          setIsPaymentProcessing(false)
          dispatch(clearCart())
        }
      })
    } catch (error) {
      console.log('error', error.response.data.message)
    }
  }

  return (
    <Box h={'full'}>
      <ScrollView pt={5} mb={'50px'}>
        <Box>
          {!isLoading ? (
            productList.map((item) => (
              <Flex
                key={item.product._id}
                px={4}
                py={2}
                alignItems={'center'}
                direction="row"
                backgroundColor={'muted.200'}
                borderBottomWidth={1}
                borderBottomColor={'muted.300'}
              >
                <Image
                  alt={item.product.productName}
                  source={{ uri: item.product.productThambnail }}
                  resizeMode="cover"
                  w={70}
                  h={70}
                  mr={5}
                />
                <Box>
                  <Heading size={'sm'}>{item.product.productName}</Heading>
                  <Text color={'muted.500'} strikeThrough>
                    {toVietnamesePrice(item.product.sellingPrice)}
                  </Text>
                  <Text fontSize={16} color={'primary.500'}>
                    {toVietnamesePrice(item.product.discountPrice)}
                  </Text>
                </Box>
                <Text position={'absolute'} bottom={2} right={5}>
                  x{item.quantity}
                </Text>
              </Flex>
            ))
          ) : (
            <Spinner />
          )}
        </Box>

        <Flex direction="row" px={5} py={5} justifyContent={'space-between'}>
          <Input placeholder="Coupon Code" flex={4} mr={2} />
          <Button flex={1}>Apply</Button>
        </Flex>

        <Box px={5} py={5}>
          <Heading size={'md'}>Payment</Heading>
          <Pressable
            onPress={() => {
              navigation.navigate('Main', {
                screen: 'ProfileNavigator',
                params: {
                  screen: 'Payment',
                  params: { fromCheckOut: true },
                },
              })
            }}
          >
            <Flex
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
              borderLeftWidth={3}
              borderLeftColor={'gray.300'}
              px={3}
              py={2}
            >
              <Text fontSize={'md'}>Choose your payment</Text>
              <Flex direction="row" alignItems={'center'}>
                <Text fontSize={'md'}>{paymentMethod}</Text>

                <IconButton
                  _icon={{ as: AntDesign, name: 'right', size: 'xs' }}
                />
              </Flex>
            </Flex>
          </Pressable>
        </Box>
        <Box px={5} py={5}>
          <Heading size={'md'}>Shipping Address</Heading>
          {/* {user.username || user.email ? <Box></Box> : <Box></Box>} */}
          <Input placeholder="Address" />
        </Box>
      </ScrollView>
      <Flex
        direction="row"
        alignItems={'center'}
        position={'absolute'}
        justifyContent={'flex-end'}
        w={'full'}
        bottom={0}
        bg={'white'}
      >
        <Text fontSize={18} fontWeight={'bold'} marginRight={5}>
          Total:{' '}
          <Text color={'primary.500'}>{toVietnamesePrice(totalPrice)}</Text>
        </Text>
        <Button px={5} onPress={checkOut} disabled={cart?.data.length <= 0}>
          <Text fontSize={18} fontWeight={'bold'} color={'white'}>
            Order
          </Text>
        </Button>
      </Flex>
      {isSuccess && (
        <Alert position={'absolute'} h={'full'} w="100%" status="success">
          <VStack space={1} flexShrink={1} w="100%" alignItems="center">
            <Alert.Icon size="md" />
            <Text
              fontSize="lg"
              fontWeight="medium"
              _dark={{
                color: 'coolGray.800',
              }}
            >
              Order Success
            </Text>
            <Box
              _text={{
                textAlign: 'center',
              }}
              _dark={{
                _text: {
                  color: 'coolGray.600',
                },
              }}
            >
              Thanks for your order. We will contact you soon. Your can check
              your order status in your profile.
              <Button
                onPress={() => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        {
                          name: 'Main',
                          state: {
                            routes: [
                              {
                                name: 'ProfileNavigator',
                                state: {
                                  routes: [
                                    {
                                      name: 'Profile',
                                    },
                                    {
                                      name: 'Order',
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    }),
                  )
                }}
                mt={5}
              >
                See Order
              </Button>
            </Box>
          </VStack>
        </Alert>
      )}

      {isPaymentProcessing && (
        <AlertDialog isOpen={isPaymentProcessing}>
          <AlertDialog.Content>
            <AlertDialog.Header fontWeight={'bold'}>
              <Heading>Payment</Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <>
                <Spinner size={'lg'} />
                <Text textAlign={'center'}>Payment Processing...</Text>
              </>
            </AlertDialog.Body>
          </AlertDialog.Content>
        </AlertDialog>
      )}
      <Modal
        isOpen={isBrowserOpen}
        onClose={() => {
          setIsBrowserOpen(false)
        }}
        size={'full'}
      >
        <Slide in={isBrowserOpen} placement="bottom" duration={250}>
          <Modal.Content h={'5/6'} mt={'auto'} mb={0} backgroundColor={'white'}>
            <Flex
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              borderBottomWidth={2}
              px={3}
              py={2}
              borderBottomColor={'gray.300'}
            >
              <Heading size={'md'}>Payment</Heading>
              <Pressable
                onPress={() => {
                  setIsBrowserOpen(false)
                  setIsPaymentProcessing(false)
                  setIsError(true)
                }}
              >
                <Text fontSize={'lg'} color={'red.300'} fontWeight={'bold'}>
                  Cancel
                </Text>
              </Pressable>
            </Flex>
            {isBrowserOpen && (
              <WebView
                style={{ width: '100%', height: '100%' }}
                source={{
                  uri: `https://elnic-api.herokuapp.com/api/orders/payment?amount=${(
                    totalPrice / 23000
                  ).toFixed(2)}&currency=USD&redirect=${redirectUrl}`,
                }}
              ></WebView>
            )}
          </Modal.Content>
        </Slide>
      </Modal>
    </Box>
  )
}

export default CheckOut
