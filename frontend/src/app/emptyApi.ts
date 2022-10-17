import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState, store } from "./store";
import { Mutex } from "async-mutex";
import { logOut, refreshToken } from "../features/auth/authSlice";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

/**
 * Add endpoints which will not trigger the access token refresh in case a 401 Unauthorized error is received here.
 */
const endpointsExcludedFromTokenRefresh = ["refreshToken"];

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();
  console.log(`sending a request to ${api.endpoint}`);
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401 && !endpointsExcludedFromTokenRefresh.includes(api.endpoint)) {
    console.log(`failed to send a request to ${api.endpoint}`);
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log("will try to refresh the access token");
        const refreshResult = await baseQuery({ url: "/auth/refresh", method: "POST" }, api, extraOptions);
        if (refreshResult.data) {
          console.log("successful token refresh");
          api.dispatch(refreshToken(refreshResult.data));
          console.log(`retrying the initial request to ${api.endpoint}`);
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.log("could not refresh the access token, logging out");
          api.dispatch(logOut());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const TagTypes = {
  REQUEST: "request" as const,
  SCHOOL: "school" as const,
  FACULTY: "faculty" as const,
  CHANNEL: "channel" as const,
  POST: "post" as const,
  COMMENT: "comment" as const,
  CHANNEL_AC: "channel_ac" as const,
};

export const IdTypes = {
  ALL: "ALL" as const,
  PARTIAL_LIST: "PARTIAL_LIST" as const,
};

// initialize an empty emptyApi service that we'll inject endpoints into later as needed
export const emptyApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  keepUnusedDataFor: 60,
  tagTypes: [
    TagTypes.REQUEST,
    TagTypes.SCHOOL,
    TagTypes.FACULTY,
    TagTypes.CHANNEL,
    TagTypes.POST,
    TagTypes.COMMENT,
    TagTypes.CHANNEL_AC,
  ],
});
