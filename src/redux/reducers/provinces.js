import {
  GET_PROVINCES_INIT,
  GET_PROVINCES_SUCCESS,
  GET_PROVINCES_ERROR
} from '../actionTypes'

const initialState = {
  isFetching: false,
  isError: false,
  items: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROVINCES_INIT:
      return { ...initialState, isFetching: true }
    case GET_PROVINCES_SUCCESS:
      return { ...initialState, items: action.payload }
    case GET_PROVINCES_ERROR:
      return { ...initialState, isError: true }
    default:
      return state
  }
}
