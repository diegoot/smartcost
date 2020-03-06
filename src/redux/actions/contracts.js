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
import { CONTRACT_STATUS_VALUES } from '../../constants'

const getContracts = () => async dispatch => {
  dispatch({ type: GET_CONTRACTS_INIT })
  try {
    const response = await fetch(
      'https://smartcost-poc-api.azurewebsites.net/api/contratos'
    )
    const contracts = await response.json()
    dispatch({ type: GET_CONTRACTS_SUCCESS, payload: contracts })
  } catch {
    dispatch({ type: GET_CONTRACTS_ERROR })
  }
}

const setContractBeingEdited = contract => ({
  type: SET_CONTRACT_BEING_EDITING,
  payload: contract
})

const clearContractBeingEdited = () => ({
  type: CLEAR_CONTRACT_BEING_EDITING
})

const saveContract = contract => async dispatch => {
  dispatch({ type: SAVE_CONTRACT_INIT })
  const response = await fetch(
    'https://smartcost-poc-api.azurewebsites.net/api/contratos',
    {
      method: 'POST',
      body: JSON.stringify({
        ...contract,
        estado: CONTRACT_STATUS_VALUES.PROGRAMADO
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  if (response.ok) {
    const contract = await response.json()
    dispatch({ type: SAVE_CONTRACT_SUCCESS, payload: contract })
  } else {
    const error = await response.text()
    dispatch({ type: SAVE_CONTRACT_ERROR, payload: error })
  }
}

const updateContract = contract => async dispatch => {
  dispatch({ type: UPDATE_CONTRACT_INIT })
  const response = await fetch(
    `https://smartcost-poc-api.azurewebsites.net/api/contratos/${contract.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...contract
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  if (response.ok) {
    dispatch({ type: UPDATE_CONTRACT_SUCCESS, payload: contract })
  } else {
    const error = await response.text()
    dispatch({ type: UPDATE_CONTRACT_ERROR, payload: error })
  }
}

const deleteContract = id => async dispatch => {
  dispatch({ type: DELETE_CONTRACT_INIT })
  const response = await fetch(
    `https://smartcost-poc-api.azurewebsites.net/api/contratos/${id}`,
    {
      method: 'DELETE'
    }
  )
  if (response.ok) {
    dispatch({ type: DELETE_CONTRACT_SUCCESS, payload: id })
  } else {
    const error = await response.text()
    dispatch({ type: DELETE_CONTRACT_ERROR, payload: error })
  }
}

const clearError = () => ({
  type: CLEAR_CONTRACT_ERROR
})

export default {
  getContracts,
  setContractBeingEdited,
  clearContractBeingEdited,
  saveContract,
  updateContract,
  deleteContract,
  clearError
}
