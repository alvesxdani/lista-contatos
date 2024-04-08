import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type LoginState = {
    email: string;
    senha: string;
}

const initialState: LoginState = {
    email: '',
    senha: ''
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      login: (state, action) => action.payload
    }
  })

  export const { login } = loginSlice.actions

export default loginSlice.reducer