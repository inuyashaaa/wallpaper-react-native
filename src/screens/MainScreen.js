import React, { useState, useEffect } from 'react'
import {
  View, StyleSheet, Dimensions, StatusBar,
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SplashScreen from 'react-native-splash-screen'
import {
  BannerAd, BannerAdSize,
} from '@react-native-firebase/admob'
import screens from './index'
import AppConfig from '../utils/AppConfig'

const { width } = Dimensions.get('window')
const tabViewConfig = {
  index: 1,
  routes: [
    { key: 'first', icon: 'format-list-bulleted-square' },
    { key: 'second', icon: 'home' },
    { key: 'third', icon: 'trending-up' },
  ],
}
const MainScreen = () => {
  const [navigationState, setNavigationState] = useState(tabViewConfig)
  const [isShowAdmod, setIsShowAdmod] = useState(true)

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  const renderIcon = ({ route, focused, color }) => (
    <MaterialCommunityIcons name={route.icon} size={28 / 375 * width} color={color} />
  )

  const renderCustomeTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#fff' }}
      style={{ backgroundColor: '#222831' }}
      renderIcon={renderIcon}
      renderLabel={() => null}
      tabStyle={{ height: 50 / 375 * width }}
      renderBadge={({ route }) => {
        if (route.key === 'third') {
          return
        }
        return (
          <View style={{
            width: 1 / 375 * width,
            height: 30 / 375 * width,
            backgroundColor: '#fff',
            alignItems: 'center',
            marginTop: 10 / 375 * width,
          }}
          />
        )
      }}
    />
  )

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <TabView
        renderTabBar={renderCustomeTabBar}
        navigationState={navigationState}
        renderScene={SceneMap({
          first: screens.CategoryScreen,
          second: screens.HomeScreen,
          third: screens.TrendingScreen,
        })}
        onIndexChange={index => setNavigationState({ ...navigationState, index })}
        initialLayout={{ width }}
        swipeEnabled
      />
      {isShowAdmod && (
        <BannerAd
          unitId={AppConfig.ADMOD_APP_ID}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
          }}
          onAdLoaded={() => {
            console.log('Advert loaded')
          }}
          d
          onAdFailedToLoad={((error) => {
            console.log('Advert failed to load: ', error)
          })}
          onAdClosed={(() => {
            setIsShowAdmod(false)
          })}
        />
      )}
    </View>
  )
}
export default MainScreen
