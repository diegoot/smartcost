import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)
