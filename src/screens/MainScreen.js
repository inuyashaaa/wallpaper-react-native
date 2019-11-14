import React, { useState, useEffect } from 'react'
import {
  View, StyleSheet, Dimensions,
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import screens from './index'

const { width } = Dimensions.get('window')
const tabViewConfig = {
  index: 1,
  routes: [
    { key: 'first', icon: 'format-list-bulleted-square' },
    { key: 'second', icon: 'home' },
    { key: 'third', icon: 'trending-up' },
  ],
}
const MainScreen = (props) => {
  const [navigationState, setNavigationState] = useState(tabViewConfig)

  const renderIcon = ({ route, focused, color }) => (
    <MaterialCommunityIcons name={route.icon} size={28 / 375 * width} color={color} />
  )

  const renderCustomeTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#d9faff' }}
      style={{ backgroundColor: '#00204a' }}
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
            backgroundColor: '#d9faff',
            alignItems: 'center',
            marginTop: 10 / 375 * width,
          }}
          />
        )
      }}
    />
  )

  return (
    <TabView
      renderTabBar={renderCustomeTabBar}
      navigationState={navigationState}
      renderScene={SceneMap({
        first: screens.HomeScreen,
        second: screens.HomeScreen,
        third: screens.ImageDetailScreen,
      })}
      onIndexChange={index => setNavigationState({ ...navigationState, index })}
      initialLayout={{ width }}
      swipeEnabled
    />
  )
}
export default MainScreen

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
})
