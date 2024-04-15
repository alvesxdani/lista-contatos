import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, IUser } from "../../Interfaces";

const initialState: AuthState = {
  user: null,
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
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
