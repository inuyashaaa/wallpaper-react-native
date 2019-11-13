import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'

const uniqueId = DeviceInfo.getUniqueID()
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
  getRandom: (arr, n) => {
    const result = new Array(n)
    let len = arr.length
    const taken = new Array(len)
    if (n > len) { n = len }
    while (n--) {
      const x = Math.floor(Math.random() * len)
      result[n] = arr[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }
    return result
  },
  secondsToMinutes: (time = 0) => `${`0${Math.floor(time / 60)}`.slice(-2)}:${`0${Math.floor(time % 60)}`.slice(-2)}`,
}

export default AppPreferences
