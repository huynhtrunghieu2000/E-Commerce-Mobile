import { Alert, Box, HStack, IconButton, Text, VStack } from 'native-base'
import React from 'react'
import { Dimensions } from 'react-native'
import PropTypes from 'prop-types'

const NotificationBox = ({ status, message }) => {
  let borderColor = null
  switch (status) {
    case 'info':
      borderColor = '#00c5dc'
      break
    case 'warning':
      borderColor = '#ffc107'
      break
    case 'success':
      borderColor = '#28a745'
      break
    case 'error':
      borderColor = '#dc3545'
      break

    default:
      break
  }
  return (
    <Box width={'full'} px={'20px'} display={'flex'} alignItems={'center'}>
      <Alert
        status={status}
        position={'absolute'}
        bottom={'20'}
        width={'full'}
        borderRadius={10}
        borderWidth={1}
        borderColor={borderColor}
      >
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                {message}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
    </Box>
  )
}

NotificationBox.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string,
}

export default NotificationBox
