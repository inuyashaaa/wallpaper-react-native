import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import firestore from '@react-native-firebase/firestore'
import { useDispatch } from 'react-redux'
import admob, { MaxAdContentRating } from '@react-native-firebase/admob'
import { screenNames } from '../configs/const'
import { setApiKeys, setSettings, setCollections } from '../redux/master'


const SplashScreen = () => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  useEffect(() => {
    const initAdmod = async () => {
      await admob().setRequestConfiguration({
        setRequestConfiguration: MaxAdContentRating.PG,
        tagForChildDirectedTreatment: true,
        tagForUnderAgeOfConsent: true,
      })
    }
    initAdmod()

    let unsubscribe1
    let unsubscribe2
    const unsubscribe = firestore()
      .collection('admod')
      .onSnapshot((querySnapshot) => {
        const settings = querySnapshot.docs.map(documentSnapshot => (documentSnapshot.data()?.enableFullAd))
        dispatch(setSettings({ enableFullAd: settings[0] }))

        unsubscribe1 = firestore()
          .collection('collections')
          .onSnapshot((querySnapshot1) => {
            const collections = querySnapshot1.docs.map(documentSnapshot => ({ search: documentSnapshot.data()?.search, image: documentSnapshot.data()?.image }))
            dispatch(setCollections(collections))

            unsubscribe2 = firestore()
              .collection('apikeys')
              .onSnapshot((querySnapshot2) => {
                const apiKeys = querySnapshot2.docs.map(documentSnapshot => (documentSnapshot.data()?.apiKey))
                dispatch(setApiKeys(apiKeys))
                goMainScreen()
              })
          })
      })

    return () => {
      unsubscribe()
      unsubscribe1()
      unsubscribe2()
    }
  }, [])

  const goMainScreen = () => {
    navigate({ routeName: screenNames.MainScreen, params: { } })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
  )
}

export default SplashScreen
