import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DummyService } from "../../services/DummyService";
import { refreshToken, TokenStateType } from "../token/tokenSlice";

interface DummyStateType {
  message: string | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: DummyStateType = { message: undefined, status: "idle", error: undefined };

export const getHelloWorld = createAsyncThunk(
  "dummy/getHelloWorld",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const { token } = getState() as { token: TokenStateType };
      if (!token.value) {
        return rejectWithValue("Access token could not be found");
      }
      return await DummyService.getHelloWorld(token.value);
    } catch (e) {
      if (e.response.status === 403) {
        await dispatch(refreshToken());
        const { token } = getState() as { token: TokenStateType };
        if (!token.value) {
          return rejectWithValue("Access token could not be found");
        }
        try {
          return await DummyService.getHelloWorld(token.value);
        } catch (e) {
          return rejectWithValue("Could not get the dummy resource after refreshing the token");
        }
      } else {
        return rejectWithValue("Some other error occurred");
      }
    }
  }
);

export const dummySlice = createSlice({
  name: "dummy",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getHelloWorld.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(getHelloWorld.rejected, (state, action) => {
        state.message = undefined;
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getHelloWorld.fulfilled, (state, action) => {
        state.message = action.payload as string;
        state.status = "succeeded";
      });
  },
});
