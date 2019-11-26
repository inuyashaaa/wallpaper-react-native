import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import firestore from '@react-native-firebase/firestore'
import { screenNames } from '../configs/const'

const SplashScreen = () => {
  const { navigate } = useNavigation()

  useEffect(() => {
    const asyncFunc = async () => {
      const unsubscribe = await loadData()
      const timout = setTimeout(() => {
        goMainScreen()
      }, 1000)

      return () => {
        clearTimeout(timout)
        unsubscribe()
      }
    }

    asyncFunc()
  }, [])

  const goMainScreen = () => {
    navigate({ routeName: screenNames.MainScreen, params: { } })
  }

  const loadData = () => {
    try {
      const unsubscribe = firestore().collection('apikeys')
        .onSnapshot((querySnapshot) => {
          const apiKeys = querySnapshot.docs.map(documentSnapshot => ({
            ...documentSnapshot.data(),
          }))
          console.log('user', apiKeys)
        })

      return unsubscribe
    } catch (error) {
      console.log('SplashScreen.loadData.error:', error)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
  )
}

export default SplashScreen
