import { api } from "./api";
import { IdTypes, TagTypes } from "./emptyApi";

export const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    getRepresentativeVerificationRequests: {
      providesTags: (result) =>
        result
          ? [
              ...result.requests.map((request) => ({ type: TagTypes.REPR_REQ, id: request.user.uuid })),
              { type: TagTypes.REPR_REQ, id: IdTypes.ALL },
            ]
          : [{ type: TagTypes.REPR_REQ, id: IdTypes.ALL }],
    },
    verifyRepresentativeUser: {
      invalidatesTags: (result, error, arg) => [
        { type: TagTypes.REPR_REQ, id: arg.verifyRepresentativeUserRequestDto.verifiedUserUuid },
      ],
    },
    deleteSchool: {
      invalidatesTags: [{ type: TagTypes.SCHOOL, id: IdTypes.ALL }],
    },
    getSchools: {
      providesTags: [{ type: TagTypes.SCHOOL, id: IdTypes.ALL }],
    },
    createSchool: {
      invalidatesTags: [{ type: TagTypes.SCHOOL, id: IdTypes.ALL }],
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
  useGetSchoolsQuery,
  useCreateSchoolMutation,
  useDeleteSchoolMutation,
} = enhancedApi;
