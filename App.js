import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Easing, Animated } from 'react-native'
import { Provider } from 'react-redux'
import screens from './src/screens'
import store from './src/redux/store'

const AppNavigator = createStackNavigator({
  SplashScreen: {
    screen: screens.SplashScreen,
  },
  MainScreen: {
    screen: screens.MainScreen,
  },
  ImageDetailScreen: {
    screen: screens.ImageDetailScreen,
  },
  CollectionScreen: {
    screen: screens.CollectionScreen,
  },
},
{
  initialRouteName: 'SplashScreen',
  headerMode: 'none',
  cardStyle: {
    opacity: 1,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps
      const { index } = scene

      const height = layout.initHeight
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      })

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      })

      return { opacity, transform: [{ translateY }] }
    },
  }),
})

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
