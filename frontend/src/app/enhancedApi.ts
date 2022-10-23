import { api, PostCommentDto } from "./api";
import { IdTypes, TagTypes } from "./emptyApi";
import { PatchCollection } from "@reduxjs/toolkit/dist/query/core/buildThunks";
import { calculateVotes } from "./apiUtil";
import { isDraft } from "@reduxjs/toolkit";

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
              ...result.requests.map((request) => ({ type: TagTypes.REQUEST, id: request.user.uuid })),
              { type: TagTypes.REQUEST, id: IdTypes.ALL },
            ]
          : [{ type: TagTypes.REQUEST, id: IdTypes.ALL }],
    },
    getTeacherVerificationRequests: {
      providesTags: (result) =>
        result
          ? [
              ...result.requests.map((request) => ({ type: TagTypes.REQUEST, id: request.user.uuid })),
              { type: TagTypes.REQUEST, id: IdTypes.ALL },
            ]
          : [{ type: TagTypes.REQUEST, id: IdTypes.ALL }],
    },
    verifyUser: {
      invalidatesTags: (result, error, arg) => [
        { type: TagTypes.REQUEST, id: arg.verifyUserRequestDto.verifiedUserUuid },
      ],
    },
    deleteSchool: {
      invalidatesTags: (result, error, arg) => [{ type: TagTypes.SCHOOL, id: arg.deleteSchoolDto.uuid }],
    },
    getAllSchools: {
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: TagTypes.SCHOOL, id: IdTypes.PARTIAL_LIST },
            ...result.schools.map((school) => ({ type: TagTypes.SCHOOL, id: school.uuid })),
          ];
        } else {
          return [{ type: TagTypes.SCHOOL, id: IdTypes.PARTIAL_LIST }];
        }
      },
    },
    getSchoolByUuid: {
      providesTags: (result, error, arg) => [{ type: TagTypes.SCHOOL, id: arg.uuid }],
    },
    createSchool: {
      invalidatesTags: [{ type: TagTypes.SCHOOL }],
    },
    updateSchool: {
      invalidatesTags: (result, error, arg) => [{ type: TagTypes.SCHOOL, id: arg.updateSchoolRequestDto.uuid }],
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
        const patches: PatchCollection[] = [];
        for (const { endpointName, originalArgs } of enhancedApi.util.selectInvalidatedBy(getState(), [
          { type: TagTypes.CHANNEL },
        ])) {
          if (endpointName === "getChannelByTextId" && originalArgs.textId !== undefined) {
            const patch = dispatch(
              enhancedApi.util.updateQueryData(endpointName, { textId: originalArgs.textId }, (draft) => {
                if (draft.uuid === channelUuid) {
                  if (joining) {
                    Object.assign(draft, { ...draft, isMember: true, memberCount: draft.memberCount + 1 });
                  } else {
                    Object.assign(draft, { ...draft, isMember: false, memberCount: draft.memberCount - 1 });
                  }
                }
              })
            );
            patches.push(patch);
          }
        }
        try {
          await queryFulfilled;
        } catch {
          patches.forEach((patch) => patch.undo());
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
      onQueryStarted: async ({ voteOnPostRequestDto: { uuid, dir } }, { dispatch, queryFulfilled, getState }) => {
        const patches: PatchCollection[] = [];
        for (const { endpointName, originalArgs } of enhancedApi.util.selectInvalidatedBy(getState(), [
          { type: TagTypes.POST, id: IdTypes.PARTIAL_LIST },
        ])) {
          if (
            endpointName === "getPostsForChannel" &&
            originalArgs.page !== undefined &&
            originalArgs.channelTextId !== undefined &&
            originalArgs.order !== undefined
          ) {
            const patch = dispatch(
              enhancedApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                Object.assign(draft, {
                  ...draft,
                  posts: [
                    ...draft.posts.map((post) => {
                      if (post.uuid === uuid) {
                        return {
                          ...post,
                          ...calculateVotes(post.up, post.down, post.dir, dir),
                        };
                      } else {
                        return post;
                      }
                    }),
                  ],
                });
              })
            );
            patches.push(patch);
          } else if (endpointName === "getUserFeed") {
            const patch = dispatch(
              enhancedApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                Object.assign(draft, {
                  ...draft,
                  posts: draft.posts.map((post) => {
                    if (post.uuid === uuid) {
                      return { ...post, ...calculateVotes(post.up, post.down, post.dir, dir) };
                    } else {
                      return post;
                    }
                  }),
                });
              })
            );
            patches.push(patch);
          }
        }
        const patch = dispatch(
          enhancedApi.util.updateQueryData("getPostByUuid", { postUuid: uuid }, (draft) => {
            Object.assign(draft, {
              ...draft,
              post: {
                ...draft.post,
                ...calculateVotes(draft.post.up, draft.post.down, draft.post.dir, dir),
              },
            });
          })
        );
        patches.push(patch);
        try {
          await queryFulfilled;
        } catch (e) {
          patches.forEach((patch) => patch.undo());
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
    getPostComments: {
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: TagTypes.COMMENT, id: arg.postUuid },
            { type: TagTypes.COMMENT, id: IdTypes.PARTIAL_LIST },
          ];
        } else {
          return [{ type: TagTypes.COMMENT, id: IdTypes.PARTIAL_LIST }];
        }
      },
    },
    getCommentComments: {
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: TagTypes.COMMENT, id: result.comments[0].postUuid },
            { type: TagTypes.COMMENT, id: IdTypes.PARTIAL_LIST },
          ];
        } else {
          return [{ type: TagTypes.COMMENT, id: IdTypes.PARTIAL_LIST }];
        }
      },
    },
    createComment: {
      invalidatesTags: (result, error, arg) => {
        return [{ type: TagTypes.COMMENT, id: arg.createCommentRequestDto.postUuid }];
      },
      onQueryStarted: async ({ createCommentRequestDto: { postUuid } }, { dispatch, queryFulfilled, getState }) => {
        const patches: PatchCollection[] = [];
        for (const { endpointName, originalArgs } of enhancedApi.util.selectInvalidatedBy(getState(), [
          { type: TagTypes.POST, id: postUuid },
        ])) {
          if (endpointName === "getPostsForChannel" || endpointName === "getUserFeed") {
            const patch = dispatch(
              enhancedApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                Object.assign(draft, {
                  ...draft,
                  posts: draft.posts.map((post) => {
                    if (post.uuid === postUuid) {
                      return { ...post, commentsCount: post.commentsCount + 1 };
                    } else {
                      return post;
                    }
                  }),
                });
              })
            );
            patches.push(patch);
          } else if (endpointName === "getPostByUuid") {
            const patch = dispatch(
              enhancedApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                Object.assign(draft, {
                  ...draft,
                  post: { ...draft.post, commentsCount: draft.post.commentsCount + 1 },
                });
              })
            );
            patches.push(patch);
          }
        }
        try {
          await queryFulfilled;
        } catch (e) {
          patches.forEach((patch) => patch.undo());
        }
      },
    },
    updateComment: {
      invalidatesTags: (result, error, arg) => [{ type: TagTypes.COMMENT, id: arg.updateCommentRequestDto.postUuid }],
      onQueryStarted: async (
        { updateCommentRequestDto: { uuid, postUuid, body } },
        { dispatch, queryFulfilled, getState }
      ) => {
        const updateCommentMapper = (comment: PostCommentDto): PostCommentDto => {
          if (comment.uuid === uuid) {
            return { ...comment, body, modified: new Date().toISOString(), edited: true };
          } else {
            return { ...comment, comments: comment.comments.map(updateCommentMapper) };
          }
        };

        const patches: PatchCollection[] = [];
        for (const { endpointName, originalArgs } of enhancedApi.util.selectInvalidatedBy(getState(), [
          { type: TagTypes.COMMENT, id: postUuid },
        ])) {
          if (endpointName === "getPostComments") {
            const patch = dispatch(
              enhancedApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                Object.assign(draft, { ...draft, comments: draft.comments.map(updateCommentMapper) });
              })
            );
            patches.push(patch);
            console.log("found the comment to update");
          }
        }

        try {
          await queryFulfilled;
        } catch (e) {
          patches.forEach((patch) => patch.undo());
        }
      },
    },
    voteOnComment: {
      onQueryStarted: async ({ voteOnCommentRequestDto: { uuid, dir } }, { dispatch, queryFulfilled, getState }) => {
        const commentMapperHelper = (comment: PostCommentDto): PostCommentDto => {
          if (comment.uuid === uuid) {
            return { ...comment, ...calculateVotes(comment.up, comment.down, comment.dir, dir) };
          } else {
            return { ...comment, comments: comment.comments.map(commentMapperHelper) };
          }
        };
        const getPostCommentsPatches: PatchCollection[] = [];
        for (const { endpointName, originalArgs } of enhancedApi.util.selectInvalidatedBy(getState(), [
          { type: TagTypes.COMMENT, id: IdTypes.PARTIAL_LIST },
        ])) {
          if (endpointName === "getPostComments") {
            const patch = dispatch(
              enhancedApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                Object.assign(draft, {
                  ...draft,
                  comments: draft.comments.map(commentMapperHelper),
                });
              })
            );
            getPostCommentsPatches.push(patch);
          }
        }
        const getCommentCommentsPatches: PatchCollection[] = [];
        for (const { endpointName, originalArgs } of enhancedApi.util.selectInvalidatedBy(getState(), [
          { type: TagTypes.COMMENT, id: IdTypes.PARTIAL_LIST },
        ])) {
          if (endpointName === "getCommentComments") {
            const patch = dispatch(
              enhancedApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                Object.assign(draft, {
                  ...draft,
                  comments: draft.comments.map(commentMapperHelper),
                });
              })
            );
            getCommentCommentsPatches.push(patch);
          }
        }
        try {
          await queryFulfilled;
        } catch (e) {
          getPostCommentsPatches.forEach((patch) => patch.undo());
          getCommentCommentsPatches.forEach((patch) => patch.undo());
        }
      },
    },
    deleteComment: {
      invalidatesTags: (result, error, arg) => [{ type: TagTypes.COMMENT, id: arg.deleteCommentRequestDto.postUuid }],
      onQueryStarted: async ({ deleteCommentRequestDto: { postUuid } }, { dispatch, queryFulfilled, getState }) => {
        const patches: PatchCollection[] = [];
        for (const { endpointName, originalArgs } of enhancedApi.util.selectInvalidatedBy(getState(), [
          { type: TagTypes.POST, id: postUuid },
        ])) {
          if (endpointName === "getPostsForChannel" || endpointName === "getUserFeed") {
            const patch = dispatch(
              enhancedApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                Object.assign(draft, {
                  ...draft,
                  posts: draft.posts.map((post) => {
                    if (post.uuid === postUuid) {
                      return { ...post, commentsCount: post.commentsCount - 1 };
                    } else {
                      return post;
                    }
                  }),
                });
              })
            );
            patches.push(patch);
          } else if (endpointName === "getPostByUuid") {
            const patch = dispatch(
              enhancedApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                Object.assign(draft, {
                  ...draft,
                  post: { ...draft.post, commentsCount: draft.post.commentsCount - 1 },
                });
              })
            );
            patches.push(patch);
          }
        }
        try {
          await queryFulfilled;
        } catch (e) {
          patches.forEach((patch) => patch.undo());
        }
      },
    },
    getUserFeed: {
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
    searchChannels: {
      providesTags: [{ type: TagTypes.CHANNEL_AC }],
    },
    getUserProfile: {
      providesTags: [{ type: TagTypes.USER }],
    },
    updateUserProfile: {
      invalidatesTags: [{ type: TagTypes.USER }],
      onQueryStarted: async ({ updateUserProfileRequestDto: { name, bio } }, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          enhancedApi.util.updateQueryData("getUserProfile", undefined, (draft) => {
            Object.assign(draft, { ...draft, name, bio });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
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
  useRefreshTokenMutation,
  useGetRepresentativeVerificationRequestsQuery,
  useGetTeacherVerificationRequestsQuery,
  useVerifyUserMutation,
  useLazyGetAllSchoolsQuery,
  useGetSchoolByUuidQuery,
  useCreateSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
  useCreateFacultyMutation,
  useLazyGetAllFacultiesQuery,
  useGetFacultyByUuidQuery,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useGetSchoolAutocompleteMutation,
  useGetFacultyAutocompleteMutation,
  useCreateChannelMutation,
  useLazyCheckChannelIdAvailabilityQuery,
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
  useGetUserFeedQuery,
  useLazySearchChannelsQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateEmailMutation,
  useLazyRefreshUsernameQuery,
} = enhancedApi;
