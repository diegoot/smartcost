import {
  GET_CONTRACTORS_INIT,
  GET_CONTRACTORS_SUCCESS,
  GET_CONTRACTORS_ERROR
} from '../actionTypes'

const initialState = {
  isFetching: false,
  isError: false,
  items: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTRACTORS_INIT:
      return { ...state, isFetching: true }
    case GET_CONTRACTORS_SUCCESS:
      return { ...state, items: action.payload }
    case GET_CONTRACTORS_ERROR:
      return { ...state, isError: true }
    default:
      return state
  }
}
