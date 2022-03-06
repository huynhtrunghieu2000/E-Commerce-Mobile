import React from 'react'
import { useLinkTo } from '@react-navigation/native'
import { Avatar, Box, Button, Center, Flex, Heading } from 'native-base'
import PropTypes from 'prop-types'
import { StatusBar, View } from 'react-native'
import SettingItem from '../components/SettingItem'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../auth/auth.slice'

const Profile = () => {
  const linkTo = useLinkTo()
  const me = useSelector((state) => state.app.me)
  const dispatch = useDispatch()
  const settingsMenu = [
    {
      title: 'Orders',
      onPress: () => {
        linkTo('/profile/order')
      },
    },
    {
      title: 'Payment',
      onPress: () => {
        linkTo('/profile/payment')
      },
    },
    // { title: 'Your Information' },
    // { title: 'Settings' },
  ]

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <Center>
        <Avatar
          size={'2xl'}
          mt={5}
          mb={2}
          source={
            me.username
              ? ''
              : {
                  uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpathwayactivities.co.uk%2Fwp-content%2Fuploads%2F2016%2F04%2FProfile_avatar_placeholder_large-circle.png&f=1&nofb=1',
                }
          }
        >
          {me.username ? me.username[0].toUpperCase() : ''}
        </Avatar>
        <Heading size={'lg'} mb={5}>
          {me.username || 'User'}
        </Heading>
        <Flex direction="row" justifyContent={'center'} mb={'10'}>
          {me.username ? (
            <Button
              mr={5}
              onPress={() => {
                dispatch(logOut())
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button mr={5} onPress={() => linkTo('/auth/login')}>
                Login
              </Button>
              <Button onPress={() => linkTo('/auth/signup')}>Sign Up</Button>
            </>
          )}
        </Flex>
        <Box w={'full'}>
          {settingsMenu.map((item, index) => (
            <SettingItem
              title={item.title}
              onPress={item.onPress}
              key={index}
            />
          ))}
        </Box>
      </Center>
    </View>
  )
}

Profile.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Profile.defaultProps = {
  navigation: { navigate: () => null },
}

export default Profile
