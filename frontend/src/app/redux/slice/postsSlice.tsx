import { createSlice } from "@reduxjs/toolkit";
import { enhancedApi } from "../../enhancedApi";

interface PostsState {
  postsLoadTime: string;
}

const initialState: PostsState = {
  postsLoadTime: new Date().toISOString(),
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPostsLoadTime(state) {
      state.postsLoadTime = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(enhancedApi.endpoints.createPost.matchFulfilled, (state) => {
      state.postsLoadTime = new Date().toISOString();
    });
    builder.addMatcher(enhancedApi.endpoints.updatePost.matchFulfilled, (state) => {
      state.postsLoadTime = new Date().toISOString();
    });
    builder.addMatcher(enhancedApi.endpoints.deletePost.matchFulfilled, (state) => {
      state.postsLoadTime = new Date().toISOString();
    });
  },
});

export default postsSlice.reducer;
export const { resetPostsLoadTime } = postsSlice.actions;
