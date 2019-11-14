import React, { useEffect, useState, useRef } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native'
import Unsplash, { toJson } from 'unsplash-js'
import FastImage from 'react-native-fast-image'
import RNWalle from 'react-native-walle'
import ActionSheet from 'react-native-actionsheet'

const { width } = Dimensions.get('window')

const App = () => {
  const [listImage, setListImage] = useState([])
  const actionsheetRef = useRef(null)

  useEffect(() => {
    const unsplash = new Unsplash({
      accessKey:
        '13ff6331fa5d44c2fff1bade0ab68eda4946dc5be59648e9730b219fd219ccb8',
    })
    unsplash.search
      .photos('dogs', 1, 100, { orientation: 'portrait' })
      .then(toJson)
      .then((res) => {
        setListImage(res.results)
      })
  }, [])

  const handleSetWallpaper = (image) => {
    console.tron.log({ image })
    RNWalle.setWallPaper(image?.urls?.regular, 'system', (res) => {
      if (res === 'success') {
        showToastMessage('Home screen wallpaper applied')
      }
    })
  }
  const showToastMessage = (message) => {
    if (!message) {
      return
    }

    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    )
  }
  const handleShowActionsheet = (image) => {
    actionsheetRef.current.show()
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
            onPress={() => handleShowActionsheet(item)}
            style={{ flex: 1 }}
            activeOpacity={0.5}
          >
            <FastImage
              source={{ uri: item.urls.small }}
              resizeMode={FastImage.resizeMode.stretch}
              style={{ width: width / 3, height: (width / 3) * 1.5 }}
            />
          </TouchableOpacity>
        )}
      />
      <ActionSheet
        ref={actionsheetRef}
        title="Which one do you like ?"
        options={['Apple', 'Banana', 'cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={(index) => { /* do something */ }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default App
