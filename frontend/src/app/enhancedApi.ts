import { api } from "./api";

export const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    getRepresentativeVerificationRequests: {
      providesTags: ["REP_REQS"],
    },
    verifyRepresentativeUser: {
      invalidatesTags: ["REP_REQS"],
    },
  },
});

export const {
  useLogInMutation,
  useLogOutMutation,
  useLazyHelloQuery,
  useLazyHelloNoAuthQuery,
  useRefreshTokenMutation,
  useGetRepresentativeVerificationRequestsQuery,
  useVerifyRepresentativeUserMutation,
  useRequestVerificationQuery,
} = enhancedApi;
