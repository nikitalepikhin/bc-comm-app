import { api } from "./api";
import { IdTypes, TagTypes } from "./emptyApi";
import { PatchCollection } from "@reduxjs/toolkit/dist/query/core/buildThunks";

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
      onQueryStarted: async (
        { toggleChannelMembershipRequestDto: { joining, channelUuid } },
        { dispatch, queryFulfilled, getState }
      ) => {
        const patchResult: PatchCollection[] = [];
        for (const { endpointName, originalArgs } of enhancedApi.util.selectInvalidatedBy(getState(), [
          { type: TagTypes.CHANNEL },
        ])) {
          if (endpointName === "getChannelByTextId" && originalArgs.textId !== undefined) {
            patchResult.push(
              dispatch(
                enhancedApi.util.updateQueryData(endpointName, { textId: originalArgs.textId }, (draft) => {
                  if (draft.uuid === channelUuid) {
                    if (joining) {
                      Object.assign(draft, { ...draft, isMember: true, memberCount: draft.memberCount + 1 });
                    } else {
                      Object.assign(draft, { ...draft, isMember: false, memberCount: draft.memberCount - 1 });
                    }
                  }
                })
              )
            );
          }
        }
        try {
          await queryFulfilled;
        } catch {
          patchResult.forEach((patch) => patch.undo());
        }
      },
    },
    updateChannel: {
      invalidatesTags: (result, error, arg) => [{ type: TagTypes.CHANNEL, id: arg.updateChannelRequestDto.textId }],
      onQueryStarted: async (
        { updateChannelRequestDto: { uuid, textId, oldTextId, name, description } },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          enhancedApi.util.updateQueryData("getChannelByTextId", { textId: oldTextId }, (draft) => {
            Object.assign(draft, { ...draft, name, description, textId });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    },
    getPostsForChannel: {
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            ...result.posts.map((post) => ({ type: TagTypes.POST, id: post.uuid })),
            { type: TagTypes.POST, id: IdTypes.PARTIAL_LIST },
          ];
        } else {
          return [{ type: TagTypes.POST, id: IdTypes.PARTIAL_LIST }];
        }
      },
    },
    getPostByUuid: {
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: TagTypes.POST, id: result.post.uuid }];
        } else {
          return [];
        }
      },
    },
    voteOnPost: {
      onQueryStarted: async ({ voteOnPostRequestDto: { postUuid, dir } }, { dispatch, queryFulfilled, getState }) => {
        const calculateVotes = (up: number, down: number, vote: number, dir: number) => {
          let result = {};
          if (vote === 0) {
            if (dir === 1) {
              result = { up: up + 1, down, vote: dir };
            } else if (dir === -1) {
              result = { up, down: down + 1, vote: dir };
            }
          } else if (vote === 1) {
            if (dir === 0) {
              result = { up: up - 1, down, vote: dir };
            } else if (dir === -1) {
              result = { up: up - 1, down: down + 1, vote: dir };
            }
          } else if (vote === -1) {
            if (dir === 0) {
              result = { up, down: down - 1, vote: dir };
            } else if (dir === 1) {
              result = { up: up + 1, down: down - 1, vote: dir };
            }
          }
          return result;
        };
        const getPostsForChannelPatches: PatchCollection[] = [];
        for (const { endpointName, originalArgs } of enhancedApi.util.selectInvalidatedBy(getState(), [
          { type: TagTypes.POST, id: IdTypes.PARTIAL_LIST },
        ])) {
          if (
            endpointName === "getPostsForChannel" &&
            originalArgs.page !== undefined &&
            originalArgs.channelTextId !== undefined &&
            originalArgs.order !== undefined
          ) {
            getPostsForChannelPatches.push(
              dispatch(
                enhancedApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                  Object.assign(draft, {
                    ...draft,
                    posts: [
                      ...draft.posts.map((post) => {
                        if (post.uuid !== postUuid) {
                          return post;
                        } else {
                          return {
                            ...post,
                            ...calculateVotes(post.up, post.down, post.dir, dir),
                          };
                        }
                      }),
                    ],
                  });
                })
              )
            );
          }
        }
        const patchSinglePost = dispatch(
          enhancedApi.util.updateQueryData("getPostByUuid", { postUuid }, (draft) => {
            Object.assign(draft, {
              ...draft,
              post: {
                ...draft.post,
                ...calculateVotes(draft.post.up, draft.post.down, draft.post.dir, dir),
              },
            });
          })
        );
        try {
          await queryFulfilled;
        } catch (e) {
          patchSinglePost.undo();
          getPostsForChannelPatches.forEach((patch) => patch.undo());
        }
      },
    },
    createPost: {
      invalidatesTags: (result, error, arg) => [{ type: TagTypes.POST, id: IdTypes.ALL }],
    },
    updatePost: {
      invalidatesTags: (result, error, arg) => [{ type: TagTypes.POST, id: arg.updatePostRequestDto.postUuid }],
      onQueryStarted: async ({ updatePostRequestDto: { postUuid, body } }, { dispatch, queryFulfilled }) => {},
    },
    deletePost: {
      invalidatesTags: (result, error, arg) => [{ type: TagTypes.POST, id: arg.deletePostRequestDto.postUuid }],
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
  useUpdateChannelMutation,
  useCreatePostMutation,
  useGetPostsForChannelQuery,
  useGetPostByUuidQuery,
  useUpdatePostMutation,
  useVoteOnPostMutation,
  useDeletePostMutation,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetPostCommentsQuery,
  useGetCommentCommentsQuery,
} = enhancedApi;
