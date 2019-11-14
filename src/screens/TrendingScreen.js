import React, { useState, useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { View } from 'react-native'
import animations from '../components/animations'

const TrendingScreen = () => {
  console.log('================================================')
  console.log('ss')
  console.log('================================================')

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView source={animations.cats} autoPlay loop />
    </View>
  )
}

export default TrendingScreen
