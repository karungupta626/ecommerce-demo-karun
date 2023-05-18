import { User } from "@/types/UserDetails";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isAuthenticated: boolean;
  
}

const userFromStorage =
  typeof window !== "undefined" && localStorage.getItem("user");

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  status: "idle",
  error: null,
  isAuthenticated: !!userFromStorage,
};   

export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (!response.ok) {
      throw new Error("Invalid username or password");
    }
    const data = await response.json();
    return data;
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage?.removeItem("user");
});

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
        state.user = action.payload as User;
        state.isAuthenticated = true;
        localStorage?.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error logging in";
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error logging out";
      });
  },
});

export default authSlice.reducer;
