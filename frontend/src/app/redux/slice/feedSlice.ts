import { createSlice } from "@reduxjs/toolkit";

interface FeedState {
  feedLoadTime: string;
}

const initialState: FeedState = {
  feedLoadTime: new Date().toISOString(),
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    resetFeedLoadTime(state) {
      state.feedLoadTime = new Date().toISOString();
    },
  },
});

export default feedSlice.reducer;
export const { resetFeedLoadTime } = feedSlice.actions;
