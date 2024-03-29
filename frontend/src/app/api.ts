import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<LogInApiResponse, LogInApiArg>({
      query: (queryArg) => ({ url: `/auth/login`, method: "POST", body: queryArg.logInUserRequestDto }),
    }),
    signUpAdmin: build.mutation<SignUpAdminApiResponse, SignUpAdminApiArg>({
      query: (queryArg) => ({ url: `/auth/signup/admin`, method: "POST", body: queryArg.createBaseUserRequestDto }),
    }),
    signUpBase: build.mutation<SignUpBaseApiResponse, SignUpBaseApiArg>({
      query: (queryArg) => ({ url: `/auth/signup/student`, method: "POST", body: queryArg.createBaseUserRequestDto }),
    }),
    signUpRepresentative: build.mutation<SignUpRepresentativeApiResponse, SignUpRepresentativeApiArg>({
      query: (queryArg) => ({
        url: `/auth/signup/representative`,
        method: "POST",
        body: queryArg.createRepresentativeUserRequestDto,
      }),
    }),
    signUpTeacher: build.mutation<SignUpTeacherApiResponse, SignUpTeacherApiArg>({
      query: (queryArg) => ({
        url: `/auth/signup/teacher`,
        method: "POST",
        body: queryArg.createTeacherUserRequestDto,
      }),
    }),
    refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>({
      query: () => ({ url: `/auth/refresh`, method: "POST" }),
    }),
    logOut: build.mutation<LogOutApiResponse, LogOutApiArg>({
      query: () => ({ url: `/auth/logout`, method: "POST" }),
    }),
    updateEmail: build.mutation<UpdateEmailApiResponse, UpdateEmailApiArg>({
      query: (queryArg) => ({ url: `/auth/update/email`, method: "PUT", body: queryArg.updateUserEmailRequestDto }),
    }),
    updatePassword: build.mutation<UpdatePasswordApiResponse, UpdatePasswordApiArg>({
      query: (queryArg) => ({
        url: `/auth/update/password`,
        method: "PUT",
        body: queryArg.updateUserPasswordRequestDto,
      }),
    }),
    deleteAccount: build.mutation<DeleteAccountApiResponse, DeleteAccountApiArg>({
      query: () => ({ url: `/auth`, method: "DELETE" }),
    }),
    refreshUsername: build.mutation<RefreshUsernameApiResponse, RefreshUsernameApiArg>({
      query: () => ({ url: `/users/refresh`, method: "PUT" }),
    }),
    verifyTeacher: build.mutation<VerifyTeacherApiResponse, VerifyTeacherApiArg>({
      query: (queryArg) => ({ url: `/users/verify/teacher`, method: "POST", body: queryArg.verifyUserRequestDto }),
    }),
    verifyRepresentative: build.mutation<VerifyRepresentativeApiResponse, VerifyRepresentativeApiArg>({
      query: (queryArg) => ({
        url: `/users/verify/representative`,
        method: "POST",
        body: queryArg.verifyUserRequestDto,
      }),
    }),
    requestVerification: build.query<RequestVerificationApiResponse, RequestVerificationApiArg>({
      query: () => ({ url: `/users/request` }),
    }),
    getUserProfile: build.query<GetUserProfileApiResponse, GetUserProfileApiArg>({
      query: () => ({ url: `/users` }),
    }),
    updateUserProfile: build.mutation<UpdateUserProfileApiResponse, UpdateUserProfileApiArg>({
      query: (queryArg) => ({ url: `/users`, method: "PUT", body: queryArg.updateUserProfileRequestDto }),
    }),
    createSchool: build.mutation<CreateSchoolApiResponse, CreateSchoolApiArg>({
      query: (queryArg) => ({ url: `/schools`, method: "POST", body: queryArg.createSchoolRequestDto }),
    }),
    getAllSchools: build.query<GetAllSchoolsApiResponse, GetAllSchoolsApiArg>({
      query: (queryArg) => ({ url: `/schools`, params: { page: queryArg.page, count: queryArg.count } }),
    }),
    updateSchool: build.mutation<UpdateSchoolApiResponse, UpdateSchoolApiArg>({
      query: (queryArg) => ({ url: `/schools`, method: "PUT", body: queryArg.updateSchoolRequestDto }),
    }),
    deleteSchool: build.mutation<DeleteSchoolApiResponse, DeleteSchoolApiArg>({
      query: (queryArg) => ({ url: `/schools`, method: "DELETE", body: queryArg.deleteSchoolRequestDto }),
    }),
    getSchoolByUuid: build.query<GetSchoolByUuidApiResponse, GetSchoolByUuidApiArg>({
      query: (queryArg) => ({ url: `/schools/${queryArg.uuid}` }),
    }),
    getSchoolAutocomplete: build.mutation<GetSchoolAutocompleteApiResponse, GetSchoolAutocompleteApiArg>({
      query: (queryArg) => ({ url: `/schools/ac`, method: "POST", body: queryArg.getSchoolAutocompleteRequestDto }),
    }),
    createFaculty: build.mutation<CreateFacultyApiResponse, CreateFacultyApiArg>({
      query: (queryArg) => ({ url: `/faculties`, method: "POST", body: queryArg.createFacultyRequestDto }),
    }),
    updateFaculty: build.mutation<UpdateFacultyApiResponse, UpdateFacultyApiArg>({
      query: (queryArg) => ({ url: `/faculties`, method: "PUT", body: queryArg.updateFacultyRequestDto }),
    }),
    deleteFaculty: build.mutation<DeleteFacultyApiResponse, DeleteFacultyApiArg>({
      query: (queryArg) => ({ url: `/faculties`, method: "DELETE", body: queryArg.deleteFacultyRequestDto }),
    }),
    getAllFaculties: build.query<GetAllFacultiesApiResponse, GetAllFacultiesApiArg>({
      query: (queryArg) => ({
        url: `/faculties/${queryArg.uuid}`,
        params: { page: queryArg.page, count: queryArg.count },
      }),
    }),
    getFacultyByUuid: build.query<GetFacultyByUuidApiResponse, GetFacultyByUuidApiArg>({
      query: (queryArg) => ({ url: `/faculties/faculty/${queryArg.uuid}` }),
    }),
    getFacultyAutocomplete: build.mutation<GetFacultyAutocompleteApiResponse, GetFacultyAutocompleteApiArg>({
      query: (queryArg) => ({ url: `/faculties/ac`, method: "POST", body: queryArg.getFacultyAutocompleteRequestDto }),
    }),
    searchChannels: build.mutation<SearchChannelsApiResponse, SearchChannelsApiArg>({
      query: (queryArg) => ({ url: `/channels/search`, method: "POST", body: queryArg.searchChannelsRequestDto }),
    }),
    createChannel: build.mutation<CreateChannelApiResponse, CreateChannelApiArg>({
      query: (queryArg) => ({ url: `/channels`, method: "POST", body: queryArg.createChannelRequestDto }),
    }),
    updateChannel: build.mutation<UpdateChannelApiResponse, UpdateChannelApiArg>({
      query: (queryArg) => ({ url: `/channels`, method: "PUT", body: queryArg.updateChannelRequestDto }),
    }),
    getChannelByTextId: build.query<GetChannelByTextIdApiResponse, GetChannelByTextIdApiArg>({
      query: (queryArg) => ({ url: `/channels/${queryArg.textId}` }),
    }),
    checkChannelIdAvailability: build.query<CheckChannelIdAvailabilityApiResponse, CheckChannelIdAvailabilityApiArg>({
      query: (queryArg) => ({ url: `/channels/new/check/${queryArg.value}` }),
    }),
    toggleMembership: build.mutation<ToggleMembershipApiResponse, ToggleMembershipApiArg>({
      query: (queryArg) => ({
        url: `/channels/member`,
        method: "POST",
        body: queryArg.toggleChannelMembershipRequestDto,
      }),
    }),
    deleteChannel: build.mutation<DeleteChannelApiResponse, DeleteChannelApiArg>({
      query: (queryArg) => ({ url: `/channels/${queryArg.uuid}`, method: "DELETE" }),
    }),
    createPost: build.mutation<CreatePostApiResponse, CreatePostApiArg>({
      query: (queryArg) => ({ url: `/posts`, method: "POST", body: queryArg.createPostRequestDto }),
    }),
    updatePost: build.mutation<UpdatePostApiResponse, UpdatePostApiArg>({
      query: (queryArg) => ({ url: `/posts`, method: "PUT", body: queryArg.updatePostRequestDto }),
    }),
    deletePost: build.mutation<DeletePostApiResponse, DeletePostApiArg>({
      query: (queryArg) => ({ url: `/posts`, method: "DELETE", body: queryArg.deletePostRequestDto }),
    }),
    getPostByUuid: build.query<GetPostByUuidApiResponse, GetPostByUuidApiArg>({
      query: (queryArg) => ({ url: `/posts/${queryArg.postUuid}` }),
    }),
    getPostsForChannel: build.query<GetPostsForChannelApiResponse, GetPostsForChannelApiArg>({
      query: (queryArg) => ({
        url: `/posts/channel/${queryArg.channelTextId}`,
        params: { page: queryArg.page, order: queryArg.order, after: queryArg.after },
      }),
    }),
    voteOnPost: build.mutation<VoteOnPostApiResponse, VoteOnPostApiArg>({
      query: (queryArg) => ({ url: `/posts/vote`, method: "POST", body: queryArg.voteOnPostRequestDto }),
    }),
    createComment: build.mutation<CreateCommentApiResponse, CreateCommentApiArg>({
      query: (queryArg) => ({ url: `/comments`, method: "POST", body: queryArg.createCommentRequestDto }),
    }),
    updateComment: build.mutation<UpdateCommentApiResponse, UpdateCommentApiArg>({
      query: (queryArg) => ({ url: `/comments`, method: "PUT", body: queryArg.updateCommentRequestDto }),
    }),
    deleteComment: build.mutation<DeleteCommentApiResponse, DeleteCommentApiArg>({
      query: (queryArg) => ({ url: `/comments`, method: "DELETE", body: queryArg.deleteCommentRequestDto }),
    }),
    getPostComments: build.query<GetPostCommentsApiResponse, GetPostCommentsApiArg>({
      query: (queryArg) => ({
        url: `/comments/post/${queryArg.postUuid}`,
        params: { page: queryArg.page, order: queryArg.order, after: queryArg.after },
      }),
    }),
    getCommentComments: build.query<GetCommentCommentsApiResponse, GetCommentCommentsApiArg>({
      query: (queryArg) => ({ url: `/comments/comment/${queryArg.commentUuid}` }),
    }),
    voteOnComment: build.mutation<VoteOnCommentApiResponse, VoteOnCommentApiArg>({
      query: (queryArg) => ({ url: `/comments/vote`, method: "POST", body: queryArg.voteOnCommentRequestDto }),
    }),
    getUserNotifications: build.query<GetUserNotificationsApiResponse, GetUserNotificationsApiArg>({
      query: () => ({ url: `/notifications` }),
    }),
    dismissUserNotification: build.mutation<DismissUserNotificationApiResponse, DismissUserNotificationApiArg>({
      query: (queryArg) => ({ url: `/notifications`, method: "POST", body: queryArg.dismissNotificationRequestDto }),
    }),
    getRepresentativeVerificationRequests: build.query<
      GetRepresentativeVerificationRequestsApiResponse,
      GetRepresentativeVerificationRequestsApiArg
    >({
      query: () => ({ url: `/representatives/verify` }),
    }),
    getTeacherVerificationRequests: build.query<
      GetTeacherVerificationRequestsApiResponse,
      GetTeacherVerificationRequestsApiArg
    >({
      query: () => ({ url: `/teachers/verify` }),
    }),
    getTeacherByUsername: build.query<GetTeacherByUsernameApiResponse, GetTeacherByUsernameApiArg>({
      query: (queryArg) => ({ url: `/teachers/${queryArg.username}` }),
    }),
    getUserFeed: build.query<GetUserFeedApiResponse, GetUserFeedApiArg>({
      query: (queryArg) => ({ url: `/feed`, params: { page: queryArg.page, after: queryArg.after } }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type LogInApiResponse = /** status 201 Authenticated user data */ UserDataResponseDto;
export type LogInApiArg = {
  logInUserRequestDto: LogInUserRequestDto;
};
export type SignUpAdminApiResponse = unknown;
export type SignUpAdminApiArg = {
  createBaseUserRequestDto: CreateBaseUserRequestDto;
};
export type SignUpBaseApiResponse = unknown;
export type SignUpBaseApiArg = {
  createBaseUserRequestDto: CreateBaseUserRequestDto;
};
export type SignUpRepresentativeApiResponse = unknown;
export type SignUpRepresentativeApiArg = {
  createRepresentativeUserRequestDto: CreateRepresentativeUserRequestDto;
};
export type SignUpTeacherApiResponse = unknown;
export type SignUpTeacherApiArg = {
  createTeacherUserRequestDto: CreateTeacherUserRequestDto;
};
export type RefreshTokenApiResponse = /** status 201 Authenticated user data */ UserDataResponseDto;
export type RefreshTokenApiArg = void;
export type LogOutApiResponse = unknown;
export type LogOutApiArg = void;
export type UpdateEmailApiResponse = /** status 200  */ UpdateUserEmailResponseDto;
export type UpdateEmailApiArg = {
  updateUserEmailRequestDto: UpdateUserEmailRequestDto;
};
export type UpdatePasswordApiResponse = unknown;
export type UpdatePasswordApiArg = {
  updateUserPasswordRequestDto: UpdateUserPasswordRequestDto;
};
export type DeleteAccountApiResponse = unknown;
export type DeleteAccountApiArg = void;
export type RefreshUsernameApiResponse = /** status 200  */ RefreshUsernameResponseDto;
export type RefreshUsernameApiArg = void;
export type VerifyTeacherApiResponse = unknown;
export type VerifyTeacherApiArg = {
  verifyUserRequestDto: VerifyUserRequestDto;
};
export type VerifyRepresentativeApiResponse = unknown;
export type VerifyRepresentativeApiArg = {
  verifyUserRequestDto: VerifyUserRequestDto;
};
export type RequestVerificationApiResponse = unknown;
export type RequestVerificationApiArg = void;
export type GetUserProfileApiResponse = /** status 200  */ GetUserProfileResponseDto;
export type GetUserProfileApiArg = void;
export type UpdateUserProfileApiResponse = unknown;
export type UpdateUserProfileApiArg = {
  updateUserProfileRequestDto: UpdateUserProfileRequestDto;
};
export type CreateSchoolApiResponse = unknown;
export type CreateSchoolApiArg = {
  createSchoolRequestDto: CreateSchoolRequestDto;
};
export type GetAllSchoolsApiResponse =
  /** status 200 Specified number of schools on a specified page. */ GetSchoolsResponseDto;
export type GetAllSchoolsApiArg = {
  page?: number;
  count?: number;
};
export type UpdateSchoolApiResponse = unknown;
export type UpdateSchoolApiArg = {
  updateSchoolRequestDto: UpdateSchoolRequestDto;
};
export type DeleteSchoolApiResponse = unknown;
export type DeleteSchoolApiArg = {
  deleteSchoolRequestDto: DeleteSchoolRequestDto;
};
export type GetSchoolByUuidApiResponse = /** status 200 School by UUID. */ SchoolResponseDto;
export type GetSchoolByUuidApiArg = {
  uuid: string;
};
export type GetSchoolAutocompleteApiResponse =
  /** status 200 School autocomplete values. */ GetSchoolAutocompleteResponseDto;
export type GetSchoolAutocompleteApiArg = {
  getSchoolAutocompleteRequestDto: GetSchoolAutocompleteRequestDto;
};
export type CreateFacultyApiResponse = unknown;
export type CreateFacultyApiArg = {
  createFacultyRequestDto: CreateFacultyRequestDto;
};
export type UpdateFacultyApiResponse = unknown;
export type UpdateFacultyApiArg = {
  updateFacultyRequestDto: UpdateFacultyRequestDto;
};
export type DeleteFacultyApiResponse = unknown;
export type DeleteFacultyApiArg = {
  deleteFacultyRequestDto: DeleteFacultyRequestDto;
};
export type GetAllFacultiesApiResponse =
  /** status 200 Specified number of faculties on a specified page. */ GetFacultiesResponseDto;
export type GetAllFacultiesApiArg = {
  page?: number;
  count?: number;
  uuid: string;
};
export type GetFacultyByUuidApiResponse = /** status 200 Faculty by UUID. */ FacultyResponseDto;
export type GetFacultyByUuidApiArg = {
  uuid: string;
};
export type GetFacultyAutocompleteApiResponse =
  /** status 200 Faculty autocomplete values. */ GetFacultyAutocompleteResponseDto;
export type GetFacultyAutocompleteApiArg = {
  getFacultyAutocompleteRequestDto: GetFacultyAutocompleteRequestDto;
};
export type SearchChannelsApiResponse =
  /** status 200 Suggested channels based on the provided value. */ SearchChannelsResponseDto;
export type SearchChannelsApiArg = {
  searchChannelsRequestDto: SearchChannelsRequestDto;
};
export type CreateChannelApiResponse = unknown;
export type CreateChannelApiArg = {
  createChannelRequestDto: CreateChannelRequestDto;
};
export type UpdateChannelApiResponse =
  /** status 200 Updated values for an existing channel. */ UpdateChannelResponseDto;
export type UpdateChannelApiArg = {
  updateChannelRequestDto: UpdateChannelRequestDto;
};
export type GetChannelByTextIdApiResponse = /** status 200 Channel data */ GetChannelByTextIdResponseDto;
export type GetChannelByTextIdApiArg = {
  textId: string;
};
export type CheckChannelIdAvailabilityApiResponse =
  /** status 200 Channel text ID if exists. */ CheckChannelIdAvailabilityResponseDto;
export type CheckChannelIdAvailabilityApiArg = {
  /** Text ID value to check. */
  value: string;
};
export type ToggleMembershipApiResponse = unknown;
export type ToggleMembershipApiArg = {
  toggleChannelMembershipRequestDto: ToggleChannelMembershipRequestDto;
};
export type DeleteChannelApiResponse = unknown;
export type DeleteChannelApiArg = {
  uuid: string;
};
export type CreatePostApiResponse = /** status 200 Uuid of the newly created post. */ CreatePostResponseDto;
export type CreatePostApiArg = {
  createPostRequestDto: CreatePostRequestDto;
};
export type UpdatePostApiResponse = unknown;
export type UpdatePostApiArg = {
  updatePostRequestDto: UpdatePostRequestDto;
};
export type DeletePostApiResponse = unknown;
export type DeletePostApiArg = {
  deletePostRequestDto: DeletePostRequestDto;
};
export type GetPostByUuidApiResponse = /** status 200 Post retrieved by uuid. */ GetPostByUuidResponseDto;
export type GetPostByUuidApiArg = {
  postUuid: string;
};
export type GetPostsForChannelApiResponse =
  /** status 200 Posts for a specified channel. */ GetPostsForChannelResponseDto;
export type GetPostsForChannelApiArg = {
  channelTextId: string;
  page?: number;
  order: "new" | "top";
  after: string;
};
export type VoteOnPostApiResponse = unknown;
export type VoteOnPostApiArg = {
  voteOnPostRequestDto: VoteOnPostRequestDto;
};
export type CreateCommentApiResponse = /** status 200 UUID of the newly created comment. */ CreateCommentResponseDto;
export type CreateCommentApiArg = {
  createCommentRequestDto: CreateCommentRequestDto;
};
export type UpdateCommentApiResponse = unknown;
export type UpdateCommentApiArg = {
  updateCommentRequestDto: UpdateCommentRequestDto;
};
export type DeleteCommentApiResponse = unknown;
export type DeleteCommentApiArg = {
  deleteCommentRequestDto: DeleteCommentRequestDto;
};
export type GetPostCommentsApiResponse = /** status 200 Post comments. */ GetCommentsUnderPostResponseDto;
export type GetPostCommentsApiArg = {
  postUuid: string;
  page: number;
  order: "top" | "new";
  after: string;
};
export type GetCommentCommentsApiResponse = /** status 200 Comment comments. */ GetCommentCommentsResponseDto;
export type GetCommentCommentsApiArg = {
  commentUuid: string;
};
export type VoteOnCommentApiResponse = unknown;
export type VoteOnCommentApiArg = {
  voteOnCommentRequestDto: VoteOnCommentRequestDto;
};
export type GetUserNotificationsApiResponse = /** status 200  */ GetUserNotificationsResponseDto;
export type GetUserNotificationsApiArg = void;
export type DismissUserNotificationApiResponse = unknown;
export type DismissUserNotificationApiArg = {
  dismissNotificationRequestDto: DismissNotificationRequestDto;
};
export type GetRepresentativeVerificationRequestsApiResponse =
  /** status 200 Representative verification requests. */ GetRepresentativeRequestsDto;
export type GetRepresentativeVerificationRequestsApiArg = void;
export type GetTeacherVerificationRequestsApiResponse =
  /** status 200 Teacher verification requests. */ GetTeacherRequestsDto;
export type GetTeacherVerificationRequestsApiArg = void;
export type GetTeacherByUsernameApiResponse = /** status 200 Teacher profile data. */ GetTeacherByUsernameResponseDto;
export type GetTeacherByUsernameApiArg = {
  username: string;
};
export type GetUserFeedApiResponse =
  /** status 200 Posts from channel that user is subscribed to. */ GetUserFeedResponseDto;
export type GetUserFeedApiArg = {
  page: number;
  after: string;
};
export type UserDataResponseDto = {
  email: string;
  username: string;
  role: string;
  accessToken: string;
  uuid: string;
  schoolUuid?: string;
  verified: boolean;
  requestsVerification: boolean;
  verificationMessage?: string;
};
export type LogInUserRequestDto = {
  email: string;
  password: string;
};
export type CreateBaseUserRequestDto = {
  email: string;
  password: string;
};
export type CreateRepresentativeUserRequestDto = {
  email: string;
  password: string;
  name: string;
  schoolUuid: string;
};
export type CreateTeacherUserRequestDto = {
  email: string;
  password: string;
  name: string;
  schoolUuid: string;
  facultyUuid: string;
};
export type UpdateUserEmailResponseDto = {
  email: string;
  accessToken: string;
};
export type UpdateUserEmailRequestDto = {
  email: string;
};
export type UpdateUserPasswordRequestDto = {
  password: string;
};
export type RefreshUsernameResponseDto = {
  username: string;
};
export type VerifyUserRequestDto = {
  approve: boolean;
  reason: string | null;
  verifiedUserUuid: string;
  type: "TEACHER" | "REPRESENTATIVE";
};
export type GetUserProfileResponseDto = {
  name?: string;
  bio?: string;
};
export type UpdateUserProfileRequestDto = {
  name?: string;
  bio?: string;
};
export type CreateSchoolRequestDto = {
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
};
export type SchoolResponseDto = {
  uuid: string;
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
};
export type GetSchoolsResponseDto = {
  schools: SchoolResponseDto[];
  pages: number;
};
export type UpdateSchoolRequestDto = {
  uuid: string;
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
};
export type DeleteSchoolRequestDto = {
  uuid: string;
};
export type SchoolAutocompleteDto = {
  value: string;
  text: string;
};
export type GetSchoolAutocompleteResponseDto = {
  schools: SchoolAutocompleteDto[];
};
export type GetSchoolAutocompleteRequestDto = {
  value: string;
};
export type CreateFacultyRequestDto = {
  schoolUuid: string;
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
};
export type UpdateFacultyRequestDto = {
  uuid: string;
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
};
export type DeleteFacultyRequestDto = {
  uuid: string;
};
export type FacultyResponseDto = {
  uuid: string;
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
};
export type GetFacultiesResponseDto = {
  faculties: FacultyResponseDto[];
  pages: number;
};
export type FacultyAutocompleteDto = {
  value: string;
  text: string;
};
export type GetFacultyAutocompleteResponseDto = {
  faculties: FacultyAutocompleteDto[];
};
export type GetFacultyAutocompleteRequestDto = {
  value: string;
  schoolUuid: string;
};
export type ChannelsSearchSuggestionDto = {
  text: string;
  value: string;
};
export type SearchChannelsResponseDto = {
  channels: ChannelsSearchSuggestionDto[];
};
export type SearchChannelsRequestDto = {
  value: string;
};
export type CreateChannelRequestDto = {
  name: string;
  description: string | null;
  textId: string;
};
export type UpdateChannelResponseDto = {
  name: string;
  textId: string;
  description: string | null;
};
export type UpdateChannelRequestDto = {
  uuid: string;
  name: string;
  textId: string;
  oldTextId: string;
  description?: string;
};
export type ChannelOwnerDto = {
  username: string;
  name: string;
  role: string;
};
export type GetChannelByTextIdResponseDto = {
  uuid: string;
  textId: string;
  name: string;
  description: string;
  isOwner: boolean;
  isMember: boolean;
  memberCount: number;
  created: string;
  owner: ChannelOwnerDto;
};
export type CheckChannelIdAvailabilityResponseDto = {
  exists: boolean;
};
export type ToggleChannelMembershipRequestDto = {
  channelUuid: string;
  joining: boolean;
};
export type CreatePostResponseDto = {
  uuid: string;
};
export type CreatePostRequestDto = {
  title: string;
  body: string;
  channelUuid: string;
};
export type UpdatePostRequestDto = {
  postUuid: string;
  body: string;
};
export type DeletePostRequestDto = {
  postUuid: string;
};
export type ChannelPostDto = {
  uuid: string;
  title: string;
  body: string;
  created: string;
  modified: string;
  author: string;
  isAuthor: boolean;
  authorIsTeacher: boolean;
  edited: boolean;
  up: number;
  down: number;
  dir: number;
  commentsCount: number;
};
export type GetPostByUuidResponseDto = {
  post: ChannelPostDto;
};
export type GetPostsForChannelResponseDto = {
  hasMore: boolean;
  posts: ChannelPostDto[];
};
export type VoteOnPostRequestDto = {
  uuid: string;
  dir: number;
};
export type CreateCommentResponseDto = {
  uuid: string;
};
export type CreateCommentRequestDto = {
  postUuid: string;
  body: string;
  parentUuid?: string;
};
export type UpdateCommentRequestDto = {
  uuid: string;
  body: string;
  postUuid: string;
};
export type DeleteCommentRequestDto = {
  uuid: string;
  postUuid: string;
};
export type PostCommentDto = {
  uuid: string;
  body: string;
  author: string;
  authorIsTeacher: boolean;
  isAuthor: boolean;
  created: string;
  modified: string;
  edited: boolean;
  up: number;
  down: number;
  dir: number;
  comments: PostCommentDto[];
  hasMore: boolean;
  level: number;
  parentUuid: string | null;
  rootUuid: string | null;
  postUuid: string;
};
export type GetCommentsUnderPostResponseDto = {
  hasMore: boolean;
  comments: PostCommentDto[];
};
export type GetCommentCommentsResponseDto = {
  comments: PostCommentDto[];
};
export type VoteOnCommentRequestDto = {
  uuid: string;
  dir: number;
};
export type NotificationDto = {
  notificationUuid: string;
  commentUuid: string;
  highlight: string;
  channelTextId: string;
  postUuid: string;
  type: "POST" | "COMMENT";
  comment: string;
  author: string;
  created: string;
};
export type GetUserNotificationsResponseDto = {
  notifications: NotificationDto[];
};
export type DismissNotificationRequestDto = {
  notificationUuid: string;
};
export type RepresentativeRequestSchoolFieldDto = {
  name: string;
  uuid: string;
};
export type RepresentativeRequestUserFieldDto = {
  email: string;
  username: string;
  created: string;
  uuid: string;
  name: string;
};
export type RepresentativeRequestDto = {
  school: RepresentativeRequestSchoolFieldDto;
  user: RepresentativeRequestUserFieldDto;
};
export type GetRepresentativeRequestsDto = {
  requests: RepresentativeRequestDto[];
};
export type TeacherRequestSchoolFieldDto = {
  name: string;
  uuid: string;
};
export type TeacherRequestFacultyFieldDto = {
  name: string;
  uuid: string;
};
export type TeacherRequestUserFieldDto = {
  email: string;
  username: string;
  created: string;
  uuid: string;
  name: string;
};
export type TeacherRequestDto = {
  school: TeacherRequestSchoolFieldDto;
  faculty: TeacherRequestFacultyFieldDto;
  user: TeacherRequestUserFieldDto;
};
export type GetTeacherRequestsDto = {
  requests: TeacherRequestDto[];
};
export type GetTeacherByUsernameResponseDto = {
  name: string;
  username: string;
  bio: string;
  school: string;
  faculty: string;
};
export type FeedPostDto = {
  uuid: string;
  channelTextId: string;
  title: string;
  body: string;
  created: string;
  modified: string;
  author: string;
  isAuthor: boolean;
  authorIsTeacher: boolean;
  edited: boolean;
  up: number;
  down: number;
  dir: number;
  commentsCount: number;
};
export type GetUserFeedResponseDto = {
  hasMore: boolean;
  hasNew: boolean;
  posts: FeedPostDto[];
};
export const {
  useLogInMutation,
  useSignUpAdminMutation,
  useSignUpBaseMutation,
  useSignUpRepresentativeMutation,
  useSignUpTeacherMutation,
  useRefreshTokenMutation,
  useLogOutMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
  useRefreshUsernameMutation,
  useVerifyTeacherMutation,
  useVerifyRepresentativeMutation,
  useRequestVerificationQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useCreateSchoolMutation,
  useGetAllSchoolsQuery,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
  useGetSchoolByUuidQuery,
  useGetSchoolAutocompleteMutation,
  useCreateFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useGetAllFacultiesQuery,
  useGetFacultyByUuidQuery,
  useGetFacultyAutocompleteMutation,
  useSearchChannelsMutation,
  useCreateChannelMutation,
  useUpdateChannelMutation,
  useGetChannelByTextIdQuery,
  useCheckChannelIdAvailabilityQuery,
  useToggleMembershipMutation,
  useDeleteChannelMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostByUuidQuery,
  useGetPostsForChannelQuery,
  useVoteOnPostMutation,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetPostCommentsQuery,
  useGetCommentCommentsQuery,
  useVoteOnCommentMutation,
  useGetUserNotificationsQuery,
  useDismissUserNotificationMutation,
  useGetRepresentativeVerificationRequestsQuery,
  useGetTeacherVerificationRequestsQuery,
  useGetTeacherByUsernameQuery,
  useGetUserFeedQuery,
} = injectedRtkApi;
