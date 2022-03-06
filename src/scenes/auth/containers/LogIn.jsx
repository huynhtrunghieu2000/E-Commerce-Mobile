import {
  CommonActions,
  useLinkTo,
  useNavigation,
} from '@react-navigation/native'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Spinner,
  Text,
  VStack,
} from 'native-base'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { pushNotification } from '../../../components/Notification/notification.slice'
import { loginAction } from '../auth.slice'

const LogIn = () => {
  const linkTo = useLinkTo()
  const navigation = useNavigation()
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const setEmail = (username) => setFormData({ ...formData, username })
  const setPassword = (password) => setFormData({ ...formData, password })

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const res = await dispatch(loginAction(formData))
      const user = unwrapResult(res)
      setIsLoading(false)
      if (user.id) {
        navigation.dispatch(CommonActions.goBack())
      }
    } catch (error) {
      dispatch(pushNotification({ status: 'error', message: error.message }))
      setIsLoading(false)
    }
  }
  return (
    <Box mt={'1/2'} px={25}>
      <Heading
        size="2xl"
        color="coolGray.800"
        _dark={{
          color: 'warmGray.50',
        }}
        fontWeight="semibold"
      >
        Login
      </Heading>
      <VStack space={3} mt="5">
        <FormControl isRequired>
          <FormControl.Label>Email</FormControl.Label>
          <Input type={'email'} onChangeText={setEmail} />
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" onChangeText={setPassword} />
          <Link
            _text={{
              fontSize: 'xs',
              fontWeight: '500',
              color: 'indigo.500',
            }}
            alignSelf="flex-end"
            mt="1"
          >
            Forget Password?
          </Link>
        </FormControl>
        <Button
          mt="2"
          backgroundColor={'primary.500'}
          onPress={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner size={22} color={'white'} />
          ) : (
            <Text color={'white'} fontSize={16} fontWeight={'bold'}>
              Sign in
            </Text>
          )}
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
          >
            I'm a new user.{' '}
          </Text>
          <Link
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
                          },
                        ],
                      },
                    },
                    {
                      name: 'Auth',
                      state: {
                        routes: [
                          {
                            name: 'SignUp',
                          },
                        ],
                      },
                    },
                  ],
                }),
              )
            }}
          >
            <Text color={'primary.500'} fontWeight={'bold'}>
              Sign Up
            </Text>
          </Link>
        </HStack>
      </VStack>
    </Box>
  )
}

export default LogIn
