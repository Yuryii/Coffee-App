import { configureStore } from '@reduxjs/toolkit'
import addCartToReducer from './addCartToReducer'
import rootReducer from './rootReducer'
export const store = configureStore({
  reducer: {
    addCartToReducer: addCartToReducer,
    rootReducer: rootReducer,
  },
})