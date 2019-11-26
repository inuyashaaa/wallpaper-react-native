import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import axios from 'axios'
import _ from 'lodash'
import { GET_MASTER_DATA, GET_MASTER_DATA_SUCCESS } from '../redux/master'
import AppConfig from '../utils/AppConfig'
import AppPreferences from '../utils/AppPreferences'

const getCourseData = action$ => action$.pipe(
  ofType(GET_MASTER_DATA),
  mergeMap(async (action) => {
    const { callback } = action.payload
    try {
      const response = await axios({
        method: 'get',
        url: `${AppConfig.API_URL}/data/all`,
        headers: { Authorization: `Bearer ${AppConfig.TOKEN}` },
      })
      return {
        data: {
          ...response.data,
        },
        callback,
      }
    } catch (error) {
      return {
        error: AppPreferences.handleErrorMessage(error.response),
        callback,
      }
    }
  }),
  map((res) => {
    res.callback(res)
    if (res.error) {
      return {
        type: 'SET_SINGLE_ERROR',
        payload: {
          message: res.error,
        },
      }
    }
    return {
      type: GET_MASTER_DATA_SUCCESS,
      payload: res.data,
    }
  }),
)

export {
  getCourseData,
}
