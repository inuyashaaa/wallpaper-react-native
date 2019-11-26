import { combineEpics } from 'redux-observable'
import { getCourseData } from './course'

const rootEpic = combineEpics(
  getCourseData,
)

export default rootEpic
