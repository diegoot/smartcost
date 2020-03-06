import {
  GET_CONTRACTS_INIT,
  GET_CONTRACTS_SUCCESS,
  GET_CONTRACTS_ERROR,
  SET_CONTRACT_BEING_EDITING,
  CLEAR_CONTRACT_BEING_EDITING,
  SAVE_CONTRACT_INIT,
  SAVE_CONTRACT_SUCCESS,
  SAVE_CONTRACT_ERROR,
  UPDATE_CONTRACT_INIT,
  UPDATE_CONTRACT_SUCCESS,
  UPDATE_CONTRACT_ERROR,
  DELETE_CONTRACT_INIT,
  DELETE_CONTRACT_SUCCESS,
  DELETE_CONTRACT_ERROR,
  CLEAR_CONTRACT_ERROR
} from '../actionTypes'

const initialState = {
  isFetching: false,
  isError: false,
  error: null,
  items: [],
  selected: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTRACTS_INIT:
    case SAVE_CONTRACT_INIT:
    case UPDATE_CONTRACT_INIT:
    case DELETE_CONTRACT_INIT:
      return { ...state, isFetching: true }
    case GET_CONTRACTS_SUCCESS:
      return { ...state, items: action.payload, isFetching: false }
    case GET_CONTRACTS_ERROR:
      return { ...state, isError: true, isFetching: false }
    case SET_CONTRACT_BEING_EDITING:
      return { ...state, selected: action.payload }
    case CLEAR_CONTRACT_BEING_EDITING:
      return { ...state, selected: initialState.selected }
    case SAVE_CONTRACT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: [...state.items, action.payload]
      }
    case UPDATE_CONTRACT_SUCCESS: {
      const index = state.items.findIndex(i => i.id === action.payload.id)
      const updatedItems = [
        ...state.items.slice(0, index),
        action.payload,
        ...state.items.slice(index + 1)
      ]
      return { ...state, items: updatedItems }
    }
    case DELETE_CONTRACT_SUCCESS: {
      const index = state.items.findIndex(i => i.id === action.payload)
      const updatedItems = [
        ...state.items.slice(0, index),
        ...state.items.slice(index + 1)
      ]
      return { ...state, items: updatedItems }
    }
    case SAVE_CONTRACT_ERROR:
    case UPDATE_CONTRACT_ERROR:
    case DELETE_CONTRACT_ERROR:
      return {
        ...state,
        isError: true,
        isFetching: false,
        error: action.payload
      }
    case CLEAR_CONTRACT_ERROR:
      return { ...state, isError: false, error: null }
    default:
      return state
  }
}
