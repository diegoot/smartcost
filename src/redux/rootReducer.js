import { combineReducers } from 'redux'
import contractsReducer from './reducers/contracts'
import contractorsReducer from './reducers/contractors'
import provincesReducer from './reducers/provinces'

export default combineReducers({
  contracts: contractsReducer,
  contractors: contractorsReducer,
  provinces: provincesReducer
})
