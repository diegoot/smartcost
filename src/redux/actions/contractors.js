import {
  GET_CONTRACTORS_INIT,
  GET_CONTRACTORS_SUCCESS,
  GET_CONTRACTORS_ERROR
} from '../actionTypes'

const getContractors = () => async dispatch => {
  dispatch({ type: GET_CONTRACTORS_INIT })
  try {
    const response = await fetch(
      'https://smartcost-poc-api.azurewebsites.net/api/contratistas'
    )
    const contractors = await response.json()
    dispatch({ type: GET_CONTRACTORS_SUCCESS, payload: contractors })
  } catch {
    dispatch({ type: GET_CONTRACTORS_ERROR })
  }
}

export default {
  getContractors
}
