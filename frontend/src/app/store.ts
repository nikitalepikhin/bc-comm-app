import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { tokenSlice } from "../features/token/tokenSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    token: tokenSlice.reducer,
  },
  ...devToolsEnhancer(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
