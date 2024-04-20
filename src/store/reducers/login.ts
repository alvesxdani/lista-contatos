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
    // Realizar logout do usuário
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
    // Checar se o usuário está logado
    checkLoginStatus: (state) => {
      // Verifica se há um usuário no localStorage e atualiza o estado
      const user = JSON.parse(localStorage.getItem('user') || 'null')
      state.user = user
    },
  },
})

export const { login, logout, checkLoginStatus } = authSlice.actions
export default authSlice.reducer
