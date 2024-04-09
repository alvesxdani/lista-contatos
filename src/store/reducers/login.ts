import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../Interfaces";

// Define the initial state of the user
interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
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
    // Estado de 'loading'
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Estado de erro
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
