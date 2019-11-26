import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { screenNames } from '../configs/const'
import axios from '../configs/axios'
import { Text } from '../components'

const { width } = Dimensions.get('window')

const App = () => {
  const master = useSelector(state => state.master)
  const { apiKeys = [] } = master
  const { navigate } = useNavigation()

  const [listImage, setListImage] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    const asyncLoadData = async () => {
      await getImages()
    }
    asyncLoadData()
  }, [])

  const getImages = async () => {
    setIsLoadingMore(true)
    try {
      const response = await axios.get(`/popular?per_page=80&page=${nextPage}`, {
        headers: {
          Authorization: apiKeys[Math.floor(Math.random() * Math.floor(apiKeys.length))],
        },
      })
      setListImage([...listImage, ...response.data.photos])
      setNextPage(nextPage + 1)
      setIsLoadingMore(false)
    } catch (error) {
      setIsLoadingMore(false)
      console.log('getImages.error', error)
    }
  }

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    try {
      const response = await axios.get('/popular?per_page=80&page=1', {
        headers: {
          Authorization: apiKeys[Math.floor(Math.random() * Math.floor(apiKeys.length))],
        },
      })

      setListImage(response.data.photos)
      setNextPage(1)
      setIsRefreshing(false)
    } catch (error) {
      setIsRefreshing(false)
      console.log('getImages.error', error)
    }
  }

  const handleGoImageDetailScreen = (image) => {
    navigate({ routeName: screenNames.ImageDetailScreen, params: { image } })
  }

  const renderFooter = () => {
    if (!isLoadingMore) return null
    return (
      <ActivityIndicator
        style={{ color: '#000', height: 50 / 375 * width }}
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshing={isRefreshing}
        onRefresh={handleRefreshData}
        showsVerticalScrollIndicator={false}
        data={listImage}
        numColumns={3}
        keyExtractor={(item, index) => `Image-${index}`}
        extraData={listImage}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleGoImageDetailScreen(item)}
            style={{ flex: 1 }}
            activeOpacity={0.9}
          >
            <FastImage
              source={{ uri: item?.src?.portrait }}
              resizeMode={FastImage.resizeMode.stretch}
              style={{ width: width / 3, height: (width / 3) * 1.5 }}
            />
          </TouchableOpacity>
        )}
        onEndReachedThreshold={0.5}
        onEndReached={getImages}
        ListFooterComponent={renderFooter}
      />

      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 30 / 375 * width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(34, 40, 49, 0.4)',
      }}
      >
        <Text style={{ fontSize: 16 }}>Trending</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

export default App
