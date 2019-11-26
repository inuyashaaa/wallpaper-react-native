import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useNavigation } from 'react-navigation-hooks'
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob'
import AppConfig from '../utils/AppConfig'
import { screenNames } from '../configs/const'
import axios from '../configs/axios'

const { width } = Dimensions.get('window')

const App = () => {
  const { navigate } = useNavigation()
  const [listImage, setListImage] = useState([])

  useEffect(() => {
    const asyncLoadData = async () => {
      await getImages()
    }
    asyncLoadData()
  }, [])

  const getImages = async () => {
    try {
      const response = await axios.get('/popular?per_page=80&page=1')
      console.tron.log({ response })
      setListImage(response.data.photos)
    } catch (error) {
      console.log('getImages.error', error)
    }
  }

  const handleGoImageDetailScreen = (image) => {
    navigate({ routeName: screenNames.ImageDetailScreen, params: { image } })
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
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
      />
      <BannerAd
        unitId={AppConfig.ADMOD_APP_ID}
        size={BannerAdSize.SMART_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Advert loaded')
        }}
        onAdFailedToLoad={(error) => {
          console.log('Advert failed to load: ', error)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default App
