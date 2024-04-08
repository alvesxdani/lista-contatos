import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './reducers/login'

const store = configureStore({
  reducer: {
    login: loginReducer,
  }
})

export default store
export type RootReducer = ReturnType<typeof store.getState>