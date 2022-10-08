import { configureStore } from "@reduxjs/toolkit";
import { devToolsEnhancer } from "@redux-devtools/extension";

import authReducer from "../features/auth/authSlice";
import commentsSlice from "../features/comments/commentsSlice";
import { api } from "./api";
import feedSlice from "../feed/feedSlice";
import postsSlice from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    comments: commentsSlice,
    feed: feedSlice,
    posts: postsSlice,
  },
  ...devToolsEnhancer(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
