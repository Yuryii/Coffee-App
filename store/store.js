import { configureStore } from '@reduxjs/toolkit'
import addCartToReducer from './addCartToReducer'
export const store = configureStore({
  reducer: {
    addCartToReducer: addCartToReducer
  },
})