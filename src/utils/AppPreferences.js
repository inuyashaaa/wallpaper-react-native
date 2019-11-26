import DeviceInfo from 'react-native-device-info'
import {
  Platform,
  ToastAndroid,
} from 'react-native'

const uniqueId = DeviceInfo.getUniqueId()
const osType = Platform.OS
const osVersion = DeviceInfo.getSystemVersion()
const appVersion = DeviceInfo.getVersion()
const model = DeviceInfo.getDeviceId()
const manufacturer = DeviceInfo.getBrand()

const AppPreferences = {
  getDeviceInfo: () => ({
    device_uuid: uniqueId,
    os_type: osType,
    os_version: osVersion,
    app_version: appVersion,
    model,
    manufacturer,
  }),
  handleErrorMessage: (error = {}) => {
    switch (error.status) {
    case 400:
      return `Bad Request: ${error?.data?.error}`
    case 401:
      return `Unauthorized: ${error?.data?.error}`
    case 403:
      return `Forbidden: ${error?.data?.error}`
    case 404:
      return `Not Found: ${error?.data?.error}`
    case 500:
      return `Internal Server Error: ${error?.data}`
    default:
      return null
    }
  },
  showToastMessage: (message) => {
    if (!message) {
      return
    }
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    )
  },
  // eslint-disable-next-line no-undef
  dev: () => __DEV__,
}

export default AppPreferences
