import { configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/login'

const store = configureStore({
  reducer: {
    authSignIn: authReducer,
  }
})

export default store
export type RootReducer = ReturnType<typeof store.getState>