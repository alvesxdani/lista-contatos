import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID'
};
firebase.initializeApp(firebaseConfig);

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

// Define the actions that can be dispatched to the store
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  } as AuthState,
  reducers: {
    // Update the user state
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    // Set the loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Set the error state
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

// Export the actions and reducer
export const { setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;