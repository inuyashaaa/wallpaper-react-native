import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

Reactotron.clear()
const reactotron = Reactotron
  .configure({
    name: 'Wallpaper-4K',
    host: 'localhost',
    port: 6969,
  })
  .useReactNative({})
  .use(reactotronRedux())
  .connect()

console.tron = Reactotron

export default reactotron
