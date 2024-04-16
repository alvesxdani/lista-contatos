import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthState, IUser } from '../../Interfaces'

const initialState: AuthState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Atualizando o estado do usuário
    login: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
    isLogged: (state) => {
      state.user != null
        ? localStorage.getItem('user')
        : localStorage.removeItem('user')
    },
  },
})

export const { login, logout, isLogged } = authSlice.actions
export default authSlice.reducer
