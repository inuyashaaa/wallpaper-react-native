import React, { useEffect } from 'react'
import {
  View, FlatList, TouchableOpacity, Dimensions, ImageBackground,
} from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from 'react-navigation-hooks'
import { Text } from '../components'
import { screenNames } from '../configs/const'

const { width } = Dimensions.get('window')

const CategoryScreen = () => {
  const master = useSelector(state => state.master)
  const { collections = [] } = master

  const { navigate } = useNavigation()

  const handleGoImageDetailScreen = (search) => {
    navigate({ routeName: screenNames.CollectionScreen, params: { search } })
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleGoImageDetailScreen(item?.search)}
    >
      <ImageBackground
        style={{
          width,
          height: 150 / 375 * width,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={{ uri: item?.image }}
      >
        <Text
          style={{
            fontSize: 30,
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {item?.search}

        </Text>
      </ImageBackground>
    </TouchableOpacity>
  )
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={collections}
        extraData={collections}
        keyExtractor={(item, index) => `FlatList-${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  )
}

export default CategoryScreen
