import { api } from "./api";

export const enhancedApi = api.enhanceEndpoints({});

export const {
  useLogInMutation,
  useLogOutMutation,
  useLazyHelloQuery,
  useLazyHelloNoAuthQuery,
  useRefreshTokenMutation,
} = enhancedApi;
