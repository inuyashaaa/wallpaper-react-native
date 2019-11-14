// react-native.config.js
module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
        ios: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
    'react-native-splash-screen': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
        ios: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
  },
}
