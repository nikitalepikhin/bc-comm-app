import { api } from "./api";
import { TagTypes } from "./emptyApi";

export const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    getRepresentativeVerificationRequests: {
      providesTags: (result) =>
        result
          ? [
              ...result.requests.map((request) => ({ type: TagTypes.REPR_REQ, id: request.user.uuid })),
              { type: TagTypes.REPR_REQ, id: TagTypes.ALL },
            ]
          : [{ type: TagTypes.REPR_REQ, id: TagTypes.ALL }],
    },
    verifyRepresentativeUser: {
      invalidatesTags: (result, error, arg) => [
        { type: TagTypes.REPR_REQ, id: arg.verifyRepresentativeUserRequestDto.verifiedUserUuid },
      ],
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
