import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/UserDetails";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const loginUserAsync = createAsyncThunk(
    "auth/login",
    async ({ username, password }: { username: string; password: string }) => {
      const response = fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          
          username: username,
          password: password,
          expiresInMins: 60, 
        })
      })
      .then(res => res.json())
      .then(console.log);
    //   const data = await response.json();
    //   if (data.status === 'success') {
    //     return data.user;
    //   } else {
    //     throw new Error(data.message);
    //   }
    }
  );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.user = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error logging in";
      });
  },
});

export default authSlice.reducer;
