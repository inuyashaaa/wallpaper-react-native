import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import createEncryptor from 'redux-persist-transform-encrypt'
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-community/async-storage'
import { createEpicMiddleware } from 'redux-observable'
import reducers from './reducers'
import AppConfig from '../utils/AppConfig'
import Reactotron from '../configs/ReactotronConfig'
import rootEpic from '../epics'
import AppPreferences from '../utils/AppPreferences'

const deviceId = DeviceInfo.getUniqueId()

const encryptor = createEncryptor({
  secretKey: deviceId,
  onError(error) {
    return error
  },
})

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  debug: false,
  timeout: 0,
  transforms: [encryptor],
}

const persistedReducer = persistCombineReducers(persistConfig, reducers)
const epicMiddleware = createEpicMiddleware()
// eslint-disable-next-line
const composeEnhancers = AppPreferences.dev() ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose

const store = createStore(persistedReducer, {},
  composeEnhancers(applyMiddleware(epicMiddleware), Reactotron.createEnhancer()))

persistStore(store)

epicMiddleware.run(rootEpic)

export default store
