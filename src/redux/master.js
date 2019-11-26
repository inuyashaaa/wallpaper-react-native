export const SET_API_KEYS = 'SET_API_KEYS'
export const SET_SETTINGS = 'SET_SETTINGS'
export const SET_COLLECTIONS = 'SET_COLLECTIONS'

export const setCollections = data => ({
  type: SET_COLLECTIONS,
  payload: { data },
})

export const setApiKeys = data => ({
  type: SET_API_KEYS,
  payload: { data },
})

export const setSettings = data => ({
  type: SET_SETTINGS,
  payload: { data },
})

const initialState = {
  settings: {},
  apiKeys: [],
  collections: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_COLLECTIONS:
    return {
      ...state, collections: action?.payload?.data,
    }
  case SET_API_KEYS:
    return {
      ...state, apiKeys: action?.payload?.data,
    }
  case SET_SETTINGS:
    return {
      ...state, settings: action?.payload?.data,
    }
  default:
    return state
  }
}
