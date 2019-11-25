import axios from 'axios'
import AppConfig from '../utils/AppConfig'

axios.defaults.baseURL = AppConfig.API_URL
axios.defaults.headers.common.Authorization = AppConfig.API_ACCESS_KEY

export default axios
