import { createSlice } from "@reduxjs/toolkit";
import { enhancedApi } from "../../app/enhancedApi";

export type RoleType = "ADMIN" | "REPRESENTATIVE" | "TEACHER" | "STUDENT";

export interface User {
  email: string | undefined;
  username: string | undefined;
  role: RoleType | undefined;
  uuid: string | undefined;
  schoolUuid: string | undefined;
  verified: boolean | undefined;
}

interface AuthState {
  user: User;
  accessToken: string | undefined;
  present: boolean;
}

const initialState: AuthState = {
  user: {
    email: undefined,
    username: undefined,
    role: undefined,
    uuid: undefined,
    schoolUuid: undefined,
    verified: undefined,
  },
  accessToken: undefined,
  present: false,
};

const populateUser = (state: any, action: any) => {
  state.user.schoolUuid = action.payload.schoolUuid;
  state.user.email = action.payload.email;
  state.user.username = action.payload.username;
  state.user.role = action.payload.role as RoleType;
  state.user.uuid = action.payload.uuid;
  state.accessToken = action.payload.accessToken;
  state.verified = action.payload.verified;
  state.present = true;
};

const resetUser = (state: any) => {
  state.user = initialState.user;
  state.accessToken = initialState.accessToken;
  state.present = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.user.email = action.payload.email;
      state.user.username = action.payload.username;
      state.user.role = action.payload.role;
      state.user.uuid = action.payload.uuid;
      state.present = true;
    },
    logOut(state) {
      state.user = initialState.user;
      state.accessToken = initialState.accessToken;
      state.present = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(enhancedApi.endpoints.logIn.matchFulfilled, populateUser);
    builder.addMatcher(enhancedApi.endpoints.refreshToken.matchFulfilled, populateUser);
    builder.addMatcher(enhancedApi.endpoints.logOut.matchFulfilled, resetUser);
    builder.addMatcher(enhancedApi.endpoints.deleteAccount.matchFulfilled, resetUser);
    builder.addMatcher(enhancedApi.endpoints.refreshUsername.matchFulfilled, (state, action) => {
      state.user.username = action.payload.username;
    });
    builder.addMatcher(enhancedApi.endpoints.updateEmail.matchFulfilled, (state, action) => {
      state.user.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    });
  },
});

export default authSlice.reducer;

export const { logOut, refreshToken } = authSlice.actions;
