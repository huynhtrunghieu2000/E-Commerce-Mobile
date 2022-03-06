import React, { useState } from 'react'
import {
  Box,
  Flex,
  Radio,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack,
  Button,
} from 'native-base'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { PaymentService } from '../helpers/paymentStorage'
import PayPal from '../../../components/Paypal/PayPal'
import { ClientID } from '../../../constants/paypal'
import { COD, PAYPAL } from '../../../constants/payment-type'
import { useDispatch, useSelector } from 'react-redux'
import { setPaymentMethod } from '../../../slices/app.slice'
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

const paymentService = new PaymentService()

const Payment = () => {
  const currentPaymentMethod = useSelector((state) => state.app.paymentMethod)
  const [selectedPayment, setSelectedPayment] = useState(currentPaymentMethod)
  const [selectedAddress, setSelectedAddress] = useState(0)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const listOptions = [
    {
      id: 0,
      name: PAYPAL,
      title: 'Paypal',
      icon: (
        <Icon
          mr={5}
          as={FontAwesome}
          name="paypal"
          size={'32px'}
          color={'black'}
        />
      ),
      onPress: () => {},
    },
    {
      id: 1,
      name: COD,
      title: 'Cash on delivery',
      icon: (
        <Icon
          as={Ionicons}
          name="cash-outline"
          size={'32px'}
          color={'black'}
          mr={5}
        />
      ),
      onPress: () => {},
    },
  ]
  return (
    <Box mx={'25px'} h="full">
      {/* <PayPal
        amount={20} //i.e $20
        orderID={123152} //transactionID
        ProductionClientID={ClientID}
        success={(a) => {
          //callback after payment has been successfully completed
          console.log(a)
        }}
        failed={(a) => {
          //callback if payment is failed
        }}
      /> */}
      <Heading size={'xl'} my={6}>
        Payment
      </Heading>
      <VStack>
        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={selectedPayment}
          onChange={(nextValue) => {
            setSelectedPayment(nextValue)
          }}
        >
          {listOptions.map((item, index) => (
            <Flex
              key={index}
              direction="row"
              alignItems={'center'}
              // shadow={1}
              borderWidth={1}
              borderColor={'muted.300'}
              borderRadius={10}
              width={'100%'}
              p={4}
              mb={3}
              justifyContent={'space-between'}
            >
              <Radio
                value={item.name}
                key={index}
                display={'flex'}
                flexDirection={'row-reverse'}
                justifyContent={'flex-end'}
                alignItems={'center'}
              >
                <Flex direction="row" flex={1}>
                  {item.icon}
                  <Heading size={'md'}>{item.title}</Heading>
                </Flex>
              </Radio>
            </Flex>
          ))}
        </Radio.Group>
      </VStack>

      <Button
        position={'absolute'}
        bottom={10}
        w={'full'}
        onPress={() => {
          dispatch(setPaymentMethod(selectedPayment))
          if (route.params?.fromCheckOut) {
            navigation.dispatch(
              CommonActions.reset({
                routes: [
                  { name: 'Main', state: { routes: [{ name: 'Cart' }] } },
                  { name: 'Checkout' },
                ],
              }),
            )
          } else {
            navigation.goBack()
          }
        }}
      >
        <Text color={'white'} fontSize={'16'}>
          Save Changes
        </Text>
      </Button>
    </Box>
  )
}

export default Payment
