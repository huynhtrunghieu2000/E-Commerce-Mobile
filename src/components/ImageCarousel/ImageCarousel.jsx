import { Image, ScrollView } from 'native-base'
import React from 'react'
import { Dimensions } from 'react-native'
import CachedImage from 'react-native-expo-cached-image'

const ImageCrousel = ({ imageAlt, imageList, h, w, borderRadius }) => {
  const ImageItem = ({ item }) => {
    return (
      <CachedImage
        source={{ uri: item }}
        style={{
          width: w,
          height: h,
          resizeMode: 'contain',
        }}
      />
    )
  }
  return (
    <ScrollView horizontal={true} snapToOffsets={[]}>
      {imageList.map((item, index) => (
        <ImageItem item={item} key={index} />
      ))}
    </ScrollView>
  )
}

export default ImageCrousel
