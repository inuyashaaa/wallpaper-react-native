import React, { useState, useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { View } from 'react-native'
import animations from '../components/animations'

const CategoryScreen = () => {
  console.log('ss')

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView source={animations.noResult} autoPlay loop />
    </View>
  )
}

export default CategoryScreen
