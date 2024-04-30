import { configureStore } from '@reduxjs/toolkit'
import addCartToReducer from './addCartToReducer'
import rootReducer from './rootReducer'
import userReducer from './userReducer'
import historyReducer from './historyReducer'
export const store = configureStore({
  reducer: {
    rootReducer: rootReducer,
    addCartToReducer: addCartToReducer,
    userReducer: userReducer,
    historyReducer: historyReducer,
  },
})