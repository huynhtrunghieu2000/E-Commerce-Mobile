import { AntDesign } from '@expo/vector-icons'
import { Box, Flex, IconButton, Text } from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'

const SettingItem = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Flex
        direction="row"
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottomWidth={1}
        borderBottomColor={'gray.300'}
        px={3}
        py={2}
      >
        <Text fontSize={'md'}>{title}</Text>
        <IconButton _icon={{ as: AntDesign, name: 'right', size: 'xs' }} />
      </Flex>
    </Pressable>
  )
}

export default SettingItem
