import React, { useEffect, useState } from 'react'
import { Link } from '@react-navigation/native'
import {
  Box,
  Button,
  ScrollView,
  Input,
  Icon,
  IconButton,
  Flex,
  Spinner,
} from 'native-base'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'
import ProductList from './components/ProductList'
import { getProduct, searchProduct } from '../../api/product/product.api'
import { getSlider } from '../../api/slider/slider.api'
import ImageCrousel from '../../components/ImageCarousel/ImageCarousel'
import { RefreshControl } from 'react-native'
import { isLoading } from 'expo-font'
import { useDispatch } from 'react-redux'
import { pushNotification } from '../../components/Notification/notification.slice'

const Home = () => {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = React.useState([])
  const [search, setSearch] = React.useState('')
  useEffect(() => {
    // Get all products
    setLoading(true)
    ;(async () => {
      try {
        const resProduct = await getProduct()
        setProducts(resProduct.data)
        setLoading(false)
        setRefreshing(false)
      } catch (error) {
        setRefreshing(false)
        dispatch(pushNotification({ status: 'error', message: error.message }))
      }
    })()
    return () => {
      setProducts([])
      setRefreshing(false)
    }
  }, [refreshing])

  // Search product
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length > 0) {
        handleSearch(search)
      } else {
        ;(async () => {
          try {
            setLoading(true)
            const res = await getProduct()
            setProducts(res.data)
            setLoading(false)
          } catch (error) {
            dispatch(
              pushNotification({ status: 'error', message: error.message }),
            )
          }
        })()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  const handleRefresh = () => {
    setRefreshing(true)
  }
  const handleSearchChange = (text) => {
    setSearch(text)
  }

  const handleSearch = async (text) => {
    try {
      setLoading(true)
      const res = await searchProduct(text)
      setProducts(res.data)
      setLoading(false)
    } catch (error) {
      dispatch(pushNotification({ status: 'error', message: error.message }))
    }
  }

  return (
    <Box safeArea bg={'#f5f6f7'} h={'full'}>
      <ScrollView
        px={25}
        pt={5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <Flex direction="row" justifyContent={'space-between'}>
          <Input
            placeholder="Search"
            h={50}
            flexGrow={1}
            borderRadius="6"
            py="3"
            px="1"
            fontSize="16"
            mb={5}
            mr={2}
            // shadow={1}
            // elevation={2}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="#828282"
                as={<MaterialIcons name="search" />}
              />
            }
            onChangeText={handleSearchChange}
          />

          {/* <IconButton
            backgroundColor={'#141010'}
            size={50}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            shadow={1}
            _icon={{
              as: AntDesign,
              name: 'filter',
              color: 'white',
              size: '24px',
            }}
          /> */}
        </Flex>
        {loading ? <Spinner /> : <ProductList data={products} />}
      </ScrollView>
    </Box>
  )
}

export default Home
