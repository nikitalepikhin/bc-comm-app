import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthenticationService } from "../../services/AuthenticationService";
import { refreshToken, TokenStateType } from "../token/tokenSlice";

export interface UserStateType {
  email: string | undefined;
  username: string | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: UserStateType = {
  email: undefined,
  username: undefined,
  status: "idle",
  error: undefined,
};

export const logInUser = createAsyncThunk(
  "user/logInUser",
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { access_token: accessToken, email, username } = await AuthenticationService.logInUser(userData);
      return { accessToken: accessToken!, email: email!, username: username! };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const logOutUser = createAsyncThunk("user/logOutUser", async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState() as { token: TokenStateType };
    if (!token.value) {
      return rejectWithValue("Access token could not be found");
    }
    await AuthenticationService.logOutUser(token.value);
    return;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = undefined;
        state.email = action.payload.email;
        state.username = action.payload.username;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logInUser.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(logOutUser.fulfilled, () => {
        return initialState;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        return { ...initialState, status: "failed", error: action.error.message };
      })
      .addCase(logOutUser.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
      })
      .addCase(refreshToken.rejected, () => {
        return initialState;
      });
  },
});
