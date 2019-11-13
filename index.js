import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

// eslint-disable-next-line no-undef
if (__DEV__) {
  import('./src/configs/ReactotronConfig')
}

AppRegistry.registerComponent(appName, () => App)
