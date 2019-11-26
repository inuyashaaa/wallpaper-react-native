export const GET_MASTER_DATA = 'GET_MASTER_DATA'
export const GET_MASTER_DATA_SUCCESS = 'GET_MASTER_DATA_SUCCESS'

export const getApiKeys = (data, callback) => ({
  type: GET_MASTER_DATA,
  payload: { data, callback },
})

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
  case GET_MASTER_DATA_SUCCESS:
    return {
      ...action.payload,
    }
  default:
    return state
  }
}
