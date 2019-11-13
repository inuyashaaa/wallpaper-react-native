import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Unsplash, { toJson } from 'unsplash-js'
import WallPaperManager from 'react-native-wallpaper-manager'

const { width } = Dimensions.get('window')

const App = () => {
  const [listImage, setListImage] = useState([])

  useEffect(() => {
    const unsplash = new Unsplash({
      accessKey:
        '13ff6331fa5d44c2fff1bade0ab68eda4946dc5be59648e9730b219fd219ccb8',
    })
    unsplash.search
      .photos('dogs', 1, 1000, { orientation: 'portrait' })
      .then(toJson)
      .then((res) => {
        console.log('res', res)
        setListImage(res.results)
      })

    WallPaperManager.setWallpaper(
      {
        uri:
          'https://images.pexels.com/photos/2974657/pexels-photo-2974657.jpeg',
      },
      res => console.log(res),
    )
  }, [])

  const handleViewImage = (image) => {}

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listImage}
        numColumns={3}
        keyExtractor={(item, index) => `Image-${index}`}
        extraData={listImage}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleViewImage(item)}
            style={{ flex: 1 }}
          >
            <Image
              source={{ uri: item.urls.full }}
              resizeMode="stretch"
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
