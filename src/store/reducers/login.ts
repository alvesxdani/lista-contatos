import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, IUser } from "../../Interfaces";

const initialState: AuthState = {
  user: null,
  error: null,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Atualizando o estado do usuário
    login: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    // Estado de erro
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError } = authSlice.actions;
export default authSlice.reducer;
