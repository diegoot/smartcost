import {
  GET_PROVINCES_INIT,
  GET_PROVINCES_SUCCESS,
  GET_PROVINCES_ERROR
} from '../actionTypes'

const getProvinces = () => async dispatch => {
  dispatch({ type: GET_PROVINCES_INIT })
  try {
    const response = await fetch(
      'https://smartcost-poc-api.azurewebsites.net/api/provincias'
    )
    const provinces = await response.json()
    dispatch({ type: GET_PROVINCES_SUCCESS, payload: provinces })
  } catch {
    dispatch({ type: GET_PROVINCES_ERROR })
  }
}

export default {
  getProvinces
}
