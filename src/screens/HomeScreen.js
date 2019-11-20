import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Unsplash, { toJson } from 'unsplash-js'
import FastImage from 'react-native-fast-image'
import { useNavigation } from 'react-navigation-hooks'
import AppConfig from '../utils/AppConfig'
import { screenNames } from '../configs/const'

const { width } = Dimensions.get('window')

const App = (props) => {
  const { navigate } = useNavigation()
  const [listImage, setListImage] = useState([])

  useEffect(() => {
    const unsplash = new Unsplash({
      accessKey: AppConfig.API_ACCESS_KEY,
      secret: AppConfig.API_SECRET_KEY,
    })
    unsplash.search
      .photos('dogs', 1, 100, { orientation: 'portrait' })
      .then(toJson)
      .then((res) => {
        setListImage(res.results)
      })
  }, [])

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
              source={{ uri: item.urls.small }}
              resizeMode={FastImage.resizeMode.stretch}
              style={{ width: width / 3, height: (width / 3) * 1.5 }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default App
