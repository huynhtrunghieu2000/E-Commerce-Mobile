import React, { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
  Checkbox,
  HStack,
  Link,
  Text,
  WarningOutlineIcon,
  ScrollView,
  Spinner,
} from 'native-base'
import {
  CommonActions,
  StackActions,
  useLinkTo,
  useNavigation,
} from '@react-navigation/native'
import { signUpAction } from '../auth.slice'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { pushNotification } from '../../../components/Notification/notification.slice'

const SignUp = () => {
  const linkTo = useLinkTo()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isValidated, setIsValidated] = useState(false)

  const [isUserNameValid, setIsUserNameValid] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true)
  const [isAgreed, setIsAgreed] = useState(false)

  const [formData, setFormData] = useState({})

  const [checked, setChecked] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const setUsername = (username) => {
    setFormData({ ...formData, username })
    if (username.length > 0) {
      setIsUserNameValid(true)
    } else {
      setIsUserNameValid(false)
    }
  }

  const setEmail = (email) => {
    setFormData({ ...formData, email })
    if (email.length > 0) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
  }
  const setPassword = (password) => {
    setFormData({ ...formData, password })
    if (password.length > 0) {
      setIsPasswordValid(true)
    } else {
      setIsPasswordValid(false)
    }
  }

  const setPasswordConfirmed = (passwordConfirmed) => {
    if (
      passwordConfirmed.length > 0 &&
      passwordConfirmed === formData.password
    ) {
      setIsPasswordConfirmed(true)
    } else {
      setIsPasswordConfirmed(false)
    }
  }

  useEffect(() => {
    if (isEmailValid && isPasswordValid && isPasswordConfirmed && isAgreed) {
      setIsValidated(true)
    } else {
      setIsValidated(false)
    }
    return () => {
      setIsValidated(false)
      setLoading(false)
    }
  }, [formData, isAgreed, isEmailValid, isPasswordConfirmed, isPasswordValid])

  const handleSignUp = async () => {
    const data = { ...formData }
    if (isValidated) {
      setError(false)
      try {
        const res = await dispatch(signUpAction(data))
        const rs = unwrapResult(res)
        dispatch(
          pushNotification({ message: rs.data.message, status: 'success' }),
        )
        setLoading(false)

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
              },
            ],
          }),
        )
      } catch (error) {
        setError(true)
        setErrorMessage(error.message)
      }
    } else {
      setError(true)
      if (!isAgreed) {
        setErrorMessage('You must agree to the terms of service')
      }
    }
  }

  return (
    <Box mt={'1/6'} px={25} safeArea>
      <ScrollView>
        <Heading
          size="2xl"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="sm"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          {error && <Text color={'red.400'}>{errorMessage}</Text>}
          <FormControl isRequired isInvalid={!isUserNameValid}>
            <FormControl.Label>Username</FormControl.Label>
            <Input onChangeText={setUsername} disabled={loading} />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Username is required
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!isEmailValid}>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={setEmail} disabled={loading} />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Email is required
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!isPasswordValid}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={setPassword}
              disabled={loading}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Password is required
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!isPasswordConfirmed}>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={setPasswordConfirmed}
              disabled={loading}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Not match with password
            </FormControl.ErrorMessage>
          </FormControl>
          <Checkbox
            value={isAgreed}
            colorScheme="green"
            onChange={(e) => {
              setIsAgreed(e)
            }}
          >
            Agree to the terms and conditions
          </Checkbox>
          <Button
            mt="2"
            bg={'primary.500'}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Sign Up'}
          </Button>
        </VStack>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
          >
            Already have an account?
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
                    },
                  ],
                }),
              )
            }}
          >
            <Text ml={1} color={'primary.500'} fontWeight={'bold'}>
              Sign In
            </Text>
          </Link>
        </HStack>
      </ScrollView>
    </Box>
  )
}

export default SignUp
