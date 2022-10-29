import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataResponseDto } from "../../api";
import { enhancedApi } from "../../enhancedApi";

export type RoleType = "ADMIN" | "REPRESENTATIVE" | "TEACHER" | "STUDENT";

export interface User {
  email: string | undefined;
  username: string | undefined;
  role: RoleType | undefined;
  uuid: string | undefined;
  schoolUuid: string | undefined;
  verified: boolean | undefined;
  requestsVerification: boolean;
  verificationMessage: string | undefined;
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
    requestsVerification: false,
    verificationMessage: undefined,
  },
  accessToken: undefined,
  present: false,
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
    refreshToken(state, action: PayloadAction<UserDataResponseDto>) {
      state.accessToken = action.payload.accessToken;
      state.user.email = action.payload.email;
      state.user.username = action.payload.username;
      state.user.role = action.payload.role as RoleType;
      state.user.uuid = action.payload.uuid;
      state.user.verified = action.payload.verified;
      state.user.requestsVerification = action.payload.requestsVerification;
      state.user.verificationMessage = action.payload.verificationMessage;
      state.present = true;
    },
    logOut(state) {
      state.user = initialState.user;
      state.accessToken = initialState.accessToken;
      state.present = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(enhancedApi.endpoints.logIn.matchFulfilled, (state, action) => {
      state.user.schoolUuid = action.payload.schoolUuid;
      state.user.email = action.payload.email;
      state.user.username = action.payload.username;
      state.user.role = action.payload.role as RoleType;
      state.user.uuid = action.payload.uuid;
      state.accessToken = action.payload.accessToken;
      state.user.verified = action.payload.verified;
      state.user.requestsVerification = action.payload.requestsVerification;
      state.user.verificationMessage = action.payload.verificationMessage;
      state.present = true;
    });
    builder.addMatcher(enhancedApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
      state.user.schoolUuid = action.payload.schoolUuid;
      state.user.email = action.payload.email;
      state.user.username = action.payload.username;
      state.user.role = action.payload.role as RoleType;
      state.user.uuid = action.payload.uuid;
      state.accessToken = action.payload.accessToken;
      state.user.verified = action.payload.verified;
      state.user.requestsVerification = action.payload.requestsVerification;
      state.user.verificationMessage = action.payload.verificationMessage;
      state.present = true;
    });
    builder.addMatcher(enhancedApi.endpoints.logOut.matchFulfilled, resetUser);
    builder.addMatcher(enhancedApi.endpoints.deleteAccount.matchFulfilled, resetUser);
    builder.addMatcher(enhancedApi.endpoints.refreshUsername.matchFulfilled, (state, action) => {
      state.user.username = action.payload.username;
    });
    builder.addMatcher(enhancedApi.endpoints.updateEmail.matchFulfilled, (state, action) => {
      state.user.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    });
    builder.addMatcher(enhancedApi.endpoints.requestVerification.matchFulfilled, (state) => {
      state.user.requestsVerification = true;
      state.user.verificationMessage = undefined;
    });
  },
});

export default authSlice.reducer;

export const { logOut, refreshToken } = authSlice.actions;
