import { configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/login'
import contatosReducer from './reducers/contatos'

const store = configureStore({
  reducer: {
    auth: authReducer,
    contatos: contatosReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store