import { useLinkTo, useNavigation } from '@react-navigation/native'
import { Box, Button, Flex, Text } from 'native-base'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { paramsToString } from '../../../helpers/paramSerialize'
import { toVietnamesePrice } from '../../../helpers/price-convert'
import { clearCart } from '../cart.slice'
import CartList from '../components/CartList'
import { CartService } from '../helpers/cartStorage'

const cartService = new CartService()
const Cart = () => {
  const linkTo = useLinkTo()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.cart)

  useEffect(() => {
    ;(async () => {
      try {
        const cart = await cartService.getCart()
        dispatch(setCart(cart))
      } catch (error) {
        cartService.removeCart()
      }
    })()
    return () => {
      cartService.setCart(cartState.data)
    }
  }, [cartState])

  return (
    <Box h={'full'} pt={5}>
      {cartState.data.length > 0 ? (
        <CartList data={cartState.data} />
      ) : (
        <Text textAlign={'center'} color={'gray.600'} fontSize={'xl'}>
          Empty cart. Let's shopping!
        </Text>
      )}
      <Flex
        direction="row"
        alignItems={'center'}
        position={'absolute'}
        justifyContent={'flex-end'}
        w={'full'}
        bottom={0}
        backgroundColor={'white'}
      >
        <Text fontSize={18} fontWeight={'bold'} marginRight={5}>
          Total:{' '}
          <Text color={'primary.500'}>
            {toVietnamesePrice(cartState.total)}
          </Text>
        </Text>
        <Button
          onPress={() => {
            navigation.navigate('Checkout', { listItem: cartState.data })
          }}
          fontSize={16}
          fontWeight={'bold'}
          disabled={cartState.data.length <= 0}
          borderRadius={0}
        >
          Checkout
        </Button>
      </Flex>
    </Box>
  )
}

export default Cart
