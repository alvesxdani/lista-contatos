import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from 'firebase/app';
import { app } from "../../services/firebase";
import 'firebase/auth';

// Define a user type that includes the Firebase user object
type User = {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
};

// Define the initial state of the user
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Define the thunks for logging in and out
export const loginAsync = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
  try {
    // Sign in with Firebase
    const user = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);

    // Return the user
    return user.user;
  } catch (error) {
    throw error;
  }
});

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  try {
    // Sign out with Firebase
    await firebase.auth().signOut();
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Atualizando o estado do usuário
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
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
  extraReducers: (builder) => {
    // Add an async reducer for logging in
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // Add an async reducer for logging out
    builder.addCase(logoutAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(logoutAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const { setUser, setLoading, setError } = loginSlice.actions;

export default loginSlice.reducer;
