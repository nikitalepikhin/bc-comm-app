import { createSlice } from "@reduxjs/toolkit";

export interface User {
  email: string;
  username: string;
  token: string;
}

interface AuthState {
  user: User | undefined;
  token: string | undefined;
}

const initialState: AuthState = {
  user: undefined,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export default authSlice.reducer;
export const { logInUser } = authSlice.actions;
