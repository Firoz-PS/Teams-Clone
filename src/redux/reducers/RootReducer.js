import { combineReducers } from 'redux'
import CallReducer from './CallReducer'

const RootReducer = combineReducers({
    calls: CallReducer,
})

export default RootReducer
