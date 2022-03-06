import React from 'react'

const Shipping = () => {
  return (
    <>
      <Heaing size={'xl'} my={6}>
        Shipping Address
      </Heaing>
      <VStack>
        <Radio.Group
          name="address"
          accessibilityLabel="favorite number"
          value={selectedAddress}
          onChange={(nextValue) => {
            setSelectedAddress(nextValue)
          }}
        >
          <Radio value="0">96 Nguyen Dinh Tuu, Da Nang</Radio>
          <Radio value="1">225 Ton Dan, Da Nang</Radio>
        </Radio.Group>
      </VStack>
    </>
  )
}

export default Shipping
