import {
    createStore,
    applyMiddleware,
} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../Reducers/reducers'

const store = createStore(
    rootReducer,
    // Logger for watching redux actions added in dev mode only
    __DEV__ ? applyMiddleware(thunkMiddleware, createLogger()) : applyMiddleware(thunkMiddleware),
)

export default store
