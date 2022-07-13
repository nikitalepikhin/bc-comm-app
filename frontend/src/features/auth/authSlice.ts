import { createSlice } from "@reduxjs/toolkit";
import { enhancedApi } from "../../app/enhancedApi";

export interface User {
  email: string | undefined;
  username: string | undefined;
  role: string | undefined;
  uuid: string | undefined;
}

interface AuthState {
  user: User;
  accessToken: string | undefined;
}

const initialState: AuthState = {
  user: { email: undefined, username: undefined, role: undefined, uuid: undefined },
  accessToken: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.user = {
        email: action.payload.email,
        username: action.payload.username,
        role: action.payload.role,
        uuid: action.payload.uuid,
      };
    },
    logOut(state) {
      state.user = initialState.user;
      state.accessToken = initialState.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(enhancedApi.endpoints.logIn.matchFulfilled, (state, action) => {
      state.user = {
        email: action.payload.email,
        username: action.payload.username,
        role: action.payload.role,
        uuid: action.payload.uuid,
      };
      state.accessToken = action.payload.accessToken;
    });
    builder.addMatcher(enhancedApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
      state.user = {
        email: action.payload.email,
        username: action.payload.username,
        role: action.payload.role,
        uuid: action.payload.uuid,
      };
      state.accessToken = action.payload.accessToken;
    });
    builder.addMatcher(enhancedApi.endpoints.logOut.matchFulfilled, (state) => {
      state.user = initialState.user;
      state.accessToken = initialState.accessToken;
      console.log("user removed from store");
    });
  },
});

export default authSlice.reducer;

export const { logOut, refreshToken } = authSlice.actions;
