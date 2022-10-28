import { configureStore } from "@reduxjs/toolkit";
import { devToolsEnhancer } from "@redux-devtools/extension";

import authReducer from "./slice/authSlice";
import commentsReducer from "./slice/commentsSlice";
import { api } from "../api";
import feedReducer from "./slice/feedSlice";
import postsReducer from "./slice/postsSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    comments: commentsReducer,
    feed: feedReducer,
    posts: postsReducer,
  },
  ...devToolsEnhancer(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
