import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInUser, logOutUser } from "../user/userSlice";
import { AuthenticationService } from "../../services/AuthenticationService";

export interface TokenStateType {
  value: string | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: TokenStateType = {
  value: undefined,
  status: "idle",
  error: undefined,
};

export const refreshToken = createAsyncThunk("user/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const { access_token: accessToken } = await AuthenticationService.refreshToken();
    return { accessToken };
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = undefined;
        state.value = action.payload.accessToken;
      })
      .addCase(logOutUser.fulfilled, () => {
        return initialState;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        return { ...initialState, status: "failed", error: action.error.message };
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = undefined;
        state.value = action.payload.accessToken;
      })
      .addCase(refreshToken.rejected, () => {
        return initialState;
      })
      .addCase(refreshToken.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      });
  },
});
