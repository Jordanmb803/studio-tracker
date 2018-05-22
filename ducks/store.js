import { createStore, applyMiddleware } from 'redux'
import reducer from './user'

const store = createStore(reducer, applyMiddleware(promiseMiddleWare()))

export default store; 