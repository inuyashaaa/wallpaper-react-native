import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import RNWalle from 'react-native-walle'
import { useNavigationParam } from 'react-navigation-hooks'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'
import Share from 'react-native-share'
import { InterstitialAd, AdEventType } from '@react-native-firebase/admob'
import { useSelector } from 'react-redux'
import AppPreferences from '../utils/AppPreferences'
import { Colors } from '../configs/const'
import { Text } from '../components'
import AppConfig from '../utils/AppConfig'

const { width, height } = Dimensions.get('window')

const ImageDetailScreen = (props) => {
  const master = useSelector(state => state.master)
  const { settings = {} } = master

  const image = useNavigationParam('image')
  const [isShowModalSetWallpaper, setIsShowModalSetWallpaper] = useState(false)


  useEffect(() => {
    if (settings?.enableFullAd) {
      const interstitial = InterstitialAd.createForAdRequest(AppConfig.ADMOD_APP_ID_FULL, {
        // requestNonPersonalizedAdsOnly: true,
      })

      const unsubscribe = interstitial.onAdEvent((type) => {
        console.log('AdEventType.type: ', type)

        if (type === AdEventType.LOADED) {
          interstitial.show()
        }
      })

      interstitial.load()

      return () => {
        unsubscribe()
      }
    }
  }, [])

  const handleSetWallpaper = (localtion = 'system') => {
    setIsShowModalSetWallpaper(false)

    RNWalle.setWallPaper(image?.src?.portrait, localtion, (res) => {
      if (res === 'success') {
        AppPreferences.showToastMessage('Home screen wallpaper applied')
      }
    })
  }

  const handleGoBack = () => {
    props?.navigation?.goBack()
  }

  const handleShowActionsheet = () => {
    setIsShowModalSetWallpaper(true)
  }

  const shareSingleImage = async (url) => {
    const shareOptions = {
      title: 'Share file',
      url,
      failOnCancel: false,
    }

    try {
      await Share.open(shareOptions)
    } catch (error) {
      console.log('Error =>', error)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FastImage
        source={{ uri: image?.src?.portrait }}
        resizeMode={FastImage.resizeMode.cover}
        style={{ width, height }}
      />
      <View style={styles.bottomBar}>

        <TouchableOpacity
          style={styles.buttonBack}
          activeOpacity={0.8}
          onPress={handleGoBack}
        >
          <MaterialIcons
            name="keyboard-backspace"
            size={26 / 375 * width}
            color={Colors.dark}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonMain}
          activeOpacity={0.8}
          onPress={handleShowActionsheet}
        >
          <MaterialIcons
            name="add"
            size={44 / 375 * width}
            color={Colors.dark}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonBack}
          activeOpacity={0.8}
          onPress={() => shareSingleImage(image?.src?.portrait)}
        >
          <MaterialIcons
            name="send"
            size={26 / 375 * width}
            color={Colors.dark}
          />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isShowModalSetWallpaper}
        onBackdropPress={() => setIsShowModalSetWallpaper(false)}
        useNativeDriver
        style={styles.modalContainer}
        animationInTiming={400}
        backdropTransitionInTiming={400}
        animationOutTiming={750}
        backdropTransitionOutTiming={750}
      >
        <View style={styles.modalSetWallpaper}>
          <TouchableOpacity
            style={styles.buttonModalContainer}
            onPress={() => handleSetWallpaper('system')}
          >
            <Text style={styles.textModal}>Set as Home screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonModalContainer, styles.divider]}
            onPress={() => handleSetWallpaper('lock')}
          >
            <Text style={styles.textModal}>Set as Lock screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonModalContainer}
            onPress={() => handleSetWallpaper('both')}
          >
            <Text style={styles.textModal}>Set both</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20 / 375 * width,
    width,
    paddingHorizontal: 30 / 375 * width,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonBack: {
    width: 50 / 375 * width,
    height: 50 / 375 * width,
    backgroundColor: 'rgba(34, 40, 49, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25 / 375 * width,
  },
  buttonMain: {
    width: 70 / 375 * width,
    height: 70 / 375 * width,
    backgroundColor: 'rgba(34, 40, 49, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35 / 375 * width,
  },
  modalSetWallpaper: {
    width: 340 / 375 * width,
    height: 132 / 375 * width,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 18 / 375 * width,
  },
  textModal: {
    color: Colors.black,
  },
  buttonModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10 / 375 * width,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.turquoise,
    borderBottomColor: Colors.turquoise,
  },
})

export default ImageDetailScreen
