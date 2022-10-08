import { createSlice } from "@reduxjs/toolkit";
import { enhancedApi } from "../../app/enhancedApi";

interface CommentsState {
  commentsLoadTime: string;
}

const initialState: CommentsState = {
  commentsLoadTime: new Date().toISOString(),
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetCommentsLoadTime(state) {
      state.commentsLoadTime = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(enhancedApi.endpoints.createComment.matchFulfilled, (state) => {
      state.commentsLoadTime = new Date().toISOString();
    });
    builder.addMatcher(enhancedApi.endpoints.updateComment.matchFulfilled, (state) => {
      state.commentsLoadTime = new Date().toISOString();
    });
    builder.addMatcher(enhancedApi.endpoints.deleteComment.matchFulfilled, (state) => {
      state.commentsLoadTime = new Date().toISOString();
    });
  },
});

export default commentsSlice.reducer;
