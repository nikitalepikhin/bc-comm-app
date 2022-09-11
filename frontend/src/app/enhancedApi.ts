import { api } from "./api";
import { IdTypes, TagTypes } from "./emptyApi";

export const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    logIn: {
      invalidatesTags: Object.values(TagTypes).map((type) => ({
        type,
      })),
    },
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
    getTeacherVerificationRequests: {
      providesTags: (result) =>
        result
          ? [
              ...result.requests.map((request) => ({ type: TagTypes.TEACHER_REQ, id: request.user.uuid })),
              { type: TagTypes.TEACHER_REQ, id: IdTypes.ALL },
            ]
          : [{ type: TagTypes.TEACHER_REQ, id: IdTypes.ALL }],
    },
    verifyTeacherUser: {
      invalidatesTags: (result, error, arg) => [
        { type: TagTypes.TEACHER_REQ, id: arg.verifyTeacherUserRequestDto.verifiedUserUuid },
      ],
    },
    deleteSchool: {
      invalidatesTags: [{ type: TagTypes.SCHOOL, id: IdTypes.ALL }],
    },
    getAllSchools: {
      providesTags: [{ type: TagTypes.SCHOOL, id: IdTypes.ALL }],
    },
    getSchoolByUuid: {
      providesTags: (result, error, arg) => [{ type: TagTypes.SCHOOL, id: arg.uuid }],
    },
    createSchool: {
      invalidatesTags: [{ type: TagTypes.SCHOOL, id: IdTypes.ALL }],
    },
    updateSchool: {
      invalidatesTags: (result, error, arg) => [
        { type: TagTypes.SCHOOL, id: arg.updateSchoolRequestDto.uuid },
        { type: TagTypes.SCHOOL, id: IdTypes.ALL },
      ],
    },
    deleteFaculty: {
      invalidatesTags: [{ type: TagTypes.FACULTY, id: IdTypes.ALL }],
    },
    getAllFaculties: {
      providesTags: [{ type: TagTypes.FACULTY, id: IdTypes.ALL }],
    },
    getFacultyByUuid: {
      providesTags: (result, error, arg) => [{ type: TagTypes.FACULTY, id: arg.uuid }],
    },
    createFaculty: {
      invalidatesTags: [{ type: TagTypes.FACULTY, id: IdTypes.ALL }],
    },
    updateFaculty: {
      invalidatesTags: (result, error, arg) => [
        { type: TagTypes.FACULTY, id: arg.updateFacultyRequestDto.uuid },
        { type: TagTypes.FACULTY, id: IdTypes.ALL },
      ],
    },
    getChannelByTextId: {
      providesTags: (result, error, arg) => [{ type: TagTypes.CHANNEL, id: arg.textId }],
    },
    toggleMembership: {
      invalidatesTags: (result, error, arg) => [
        { type: TagTypes.CHANNEL, id: arg.toggleChannelMembershipRequestDto.channelUuid },
      ],
      onQueryStarted: async (
        { toggleChannelMembershipRequestDto: { channelTextId, joining } },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          enhancedApi.util.updateQueryData("getChannelByTextId", { textId: channelTextId }, (draft) => {
            if (joining) {
              Object.assign(draft, { ...draft, isMember: true, memberCount: draft.memberCount + 1 });
            } else {
              Object.assign(draft, { ...draft, isMember: false, memberCount: draft.memberCount - 1 });
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    },
  },
});

export const {
  useLogInMutation,
  useLogOutMutation,
  useSignUpBaseMutation,
  useSignUpTeacherMutation,
  useSignUpRepresentativeMutation,
  useLazyHelloQuery,
  useLazyHelloNoAuthQuery,
  useRefreshTokenMutation,
  useGetRepresentativeVerificationRequestsQuery,
  useVerifyRepresentativeUserMutation,
  useRequestRepresentativeVerificationQuery,
  useGetTeacherVerificationRequestsQuery,
  useVerifyTeacherUserMutation,
  useRequestTeacherVerificationQuery,
  useGetAllSchoolsQuery,
  useGetSchoolByUuidQuery,
  useCreateSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
  useCreateFacultyMutation,
  useGetAllFacultiesQuery,
  useGetFacultyByUuidQuery,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useGetSchoolAutocompleteMutation,
  useGetFacultyAutocompleteMutation,
  useCreateChannelMutation,
  useLazyCheckChannelIdAvailabilityQuery,
  useSearchChannelsMutation,
  useGetChannelByTextIdQuery,
  useToggleMembershipMutation,
} = enhancedApi;
