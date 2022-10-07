import { createSlice } from "@reduxjs/toolkit";
import { enhancedApi } from "../../app/enhancedApi";

interface CommentsState {
  postCommentsRequestDate: string;
}

const initialState: CommentsState = {
  postCommentsRequestDate: new Date().toISOString(),
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(enhancedApi.endpoints.createComment.matchFulfilled, (state) => {
      state.postCommentsRequestDate = new Date().toISOString();
    });
  },
});

export default commentsSlice.reducer;
