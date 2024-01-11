// import { combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import {composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension'

// Reducers
import {cartReducer} from './reducers/cartReducers'
import {
  getProductsReducer,
  getProductDetailsReducer,
} from './reducers/productReducers'
import {userReducer} from './reducers/userReducer'

const reducer = combineReducers({
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
  user: userReducer,
})

const middleware = [thunk]

const cartItemsInLocalStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : []

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
}

const devTools = {
    tool: devToolsEnhancer(applyMiddleware(...middleware)),
}

const store = configureStore({
  reducer,
  INITIAL_STATE,
  devTools
//   devToolsEnhancer(composeWithDevTools(...middleware)),
//   devToolsEnhancer(applyMiddleware(...middleware)),
})

export default store