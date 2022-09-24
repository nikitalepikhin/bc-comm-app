import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<LogInApiResponse, LogInApiArg>({
      query: (queryArg) => ({ url: `/auth/login`, method: "POST", body: queryArg.logInUserRequestDto }),
    }),
    signUpBase: build.mutation<SignUpBaseApiResponse, SignUpBaseApiArg>({
      query: (queryArg) => ({ url: `/auth/signup/base`, method: "POST", body: queryArg.createBaseUserDto }),
    }),
    signUpRepresentative: build.mutation<SignUpRepresentativeApiResponse, SignUpRepresentativeApiArg>({
      query: (queryArg) => ({
        url: `/auth/signup/representative`,
        method: "POST",
        body: queryArg.createRepresentativeUserDto,
      }),
    }),
    signUpTeacher: build.mutation<SignUpTeacherApiResponse, SignUpTeacherApiArg>({
      query: (queryArg) => ({ url: `/auth/signup/teacher`, method: "POST", body: queryArg.createTeacherUserDto }),
    }),
    refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>({
      query: () => ({ url: `/auth/refresh`, method: "POST" }),
    }),
    logOut: build.mutation<LogOutApiResponse, LogOutApiArg>({
      query: () => ({ url: `/auth/logout`, method: "POST" }),
    }),
    refreshUsername: build.query<RefreshUsernameApiResponse, RefreshUsernameApiArg>({
      query: () => ({ url: `/users/refresh` }),
    }),
    createSchool: build.mutation<CreateSchoolApiResponse, CreateSchoolApiArg>({
      query: (queryArg) => ({ url: `/schools`, method: "POST", body: queryArg.createSchoolDto }),
    }),
    getAllSchools: build.query<GetAllSchoolsApiResponse, GetAllSchoolsApiArg>({
      query: (queryArg) => ({ url: `/schools`, params: { page: queryArg.page, count: queryArg.count } }),
    }),
    updateSchool: build.mutation<UpdateSchoolApiResponse, UpdateSchoolApiArg>({
      query: (queryArg) => ({ url: `/schools`, method: "PUT", body: queryArg.updateSchoolRequestDto }),
    }),
    deleteSchool: build.mutation<DeleteSchoolApiResponse, DeleteSchoolApiArg>({
      query: (queryArg) => ({ url: `/schools`, method: "DELETE", body: queryArg.deleteSchoolDto }),
    }),
    getSchoolByUuid: build.query<GetSchoolByUuidApiResponse, GetSchoolByUuidApiArg>({
      query: (queryArg) => ({ url: `/schools/${queryArg.uuid}` }),
    }),
    getSchoolAutocomplete: build.mutation<GetSchoolAutocompleteApiResponse, GetSchoolAutocompleteApiArg>({
      query: (queryArg) => ({ url: `/schools/ac`, method: "POST", body: queryArg.getSchoolAutocompleteRequestDto }),
    }),
    createFaculty: build.mutation<CreateFacultyApiResponse, CreateFacultyApiArg>({
      query: (queryArg) => ({ url: `/faculties`, method: "POST", body: queryArg.createFacultyDto }),
    }),
    updateFaculty: build.mutation<UpdateFacultyApiResponse, UpdateFacultyApiArg>({
      query: (queryArg) => ({ url: `/faculties`, method: "PUT", body: queryArg.updateFacultyRequestDto }),
    }),
    deleteFaculty: build.mutation<DeleteFacultyApiResponse, DeleteFacultyApiArg>({
      query: (queryArg) => ({ url: `/faculties`, method: "DELETE", body: queryArg.deleteFacultyDto }),
    }),
    getAllFaculties: build.query<GetAllFacultiesApiResponse, GetAllFacultiesApiArg>({
      query: (queryArg) => ({
        url: `/faculties/${queryArg.schoolUuid}`,
        params: { page: queryArg.page, count: queryArg.count },
      }),
    }),
    getFacultyByUuid: build.query<GetFacultyByUuidApiResponse, GetFacultyByUuidApiArg>({
      query: (queryArg) => ({ url: `/faculties/faculty/${queryArg.uuid}` }),
    }),
    getFacultyAutocomplete: build.mutation<GetFacultyAutocompleteApiResponse, GetFacultyAutocompleteApiArg>({
      query: (queryArg) => ({ url: `/faculties/ac`, method: "POST", body: queryArg.getFacultyAutocompleteRequestDto }),
    }),
    hello: build.query<HelloApiResponse, HelloApiArg>({
      query: () => ({ url: `/test/hello` }),
    }),
    helloNoAuth: build.query<HelloNoAuthApiResponse, HelloNoAuthApiArg>({
      query: () => ({ url: `/test/guest` }),
    }),
    requestRepresentativeVerification: build.query<
      RequestRepresentativeVerificationApiResponse,
      RequestRepresentativeVerificationApiArg
    >({
      query: () => ({ url: `/representatives/request` }),
    }),
    getRepresentativeVerificationRequests: build.query<
      GetRepresentativeVerificationRequestsApiResponse,
      GetRepresentativeVerificationRequestsApiArg
    >({
      query: () => ({ url: `/representatives/verify` }),
    }),
    verifyRepresentativeUser: build.mutation<VerifyRepresentativeUserApiResponse, VerifyRepresentativeUserApiArg>({
      query: (queryArg) => ({
        url: `/representatives/verify`,
        method: "POST",
        body: queryArg.verifyRepresentativeUserRequestDto,
      }),
    }),
    requestTeacherVerification: build.query<RequestTeacherVerificationApiResponse, RequestTeacherVerificationApiArg>({
      query: () => ({ url: `/teachers/request` }),
    }),
    getTeacherVerificationRequests: build.query<
      GetTeacherVerificationRequestsApiResponse,
      GetTeacherVerificationRequestsApiArg
    >({
      query: () => ({ url: `/teachers/verify` }),
    }),
    verifyTeacherUser: build.mutation<VerifyTeacherUserApiResponse, VerifyTeacherUserApiArg>({
      query: (queryArg) => ({ url: `/teachers/verify`, method: "POST", body: queryArg.verifyTeacherUserRequestDto }),
    }),
    searchChannels: build.mutation<SearchChannelsApiResponse, SearchChannelsApiArg>({
      query: (queryArg) => ({
        url: `/channels/search`,
        method: "POST",
        body: queryArg.getChannelsSearchSuggestionsRequestDto,
      }),
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
        url: `/posts/channel/${queryArg.channelTextId}/${queryArg.order}`,
        params: { page: queryArg.page },
      }),
    }),
    voteOnPost: build.mutation<VoteOnPostApiResponse, VoteOnPostApiArg>({
      query: (queryArg) => ({ url: `/posts/vote`, method: "POST", body: queryArg.voteOnPostRequestDto }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type LogInApiResponse = /** status 201 Authenticated user data */ UserDataResponseDto;
export type LogInApiArg = {
  logInUserRequestDto: LogInUserRequestDto;
};
export type SignUpBaseApiResponse = unknown;
export type SignUpBaseApiArg = {
  createBaseUserDto: CreateBaseUserDto;
};
export type SignUpRepresentativeApiResponse = unknown;
export type SignUpRepresentativeApiArg = {
  createRepresentativeUserDto: CreateRepresentativeUserDto;
};
export type SignUpTeacherApiResponse = unknown;
export type SignUpTeacherApiArg = {
  createTeacherUserDto: CreateTeacherUserDto;
};
export type RefreshTokenApiResponse = /** status 201 Authenticated user data */ UserDataResponseDto;
export type RefreshTokenApiArg = void;
export type LogOutApiResponse = unknown;
export type LogOutApiArg = void;
export type RefreshUsernameApiResponse = unknown;
export type RefreshUsernameApiArg = void;
export type CreateSchoolApiResponse = unknown;
export type CreateSchoolApiArg = {
  createSchoolDto: CreateSchoolDto;
};
export type GetAllSchoolsApiResponse =
  /** status 200 Specified number of schools on a specified page. */ GetSchoolsResponseDto;
export type GetAllSchoolsApiArg = {
  page: string;
  count: string;
};
export type UpdateSchoolApiResponse = unknown;
export type UpdateSchoolApiArg = {
  updateSchoolRequestDto: UpdateSchoolRequestDto;
};
export type DeleteSchoolApiResponse = unknown;
export type DeleteSchoolApiArg = {
  deleteSchoolDto: DeleteSchoolDto;
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
  createFacultyDto: CreateFacultyDto;
};
export type UpdateFacultyApiResponse = unknown;
export type UpdateFacultyApiArg = {
  updateFacultyRequestDto: UpdateFacultyRequestDto;
};
export type DeleteFacultyApiResponse = unknown;
export type DeleteFacultyApiArg = {
  deleteFacultyDto: DeleteFacultyDto;
};
export type GetAllFacultiesApiResponse =
  /** status 200 Specified number of faculties on a specified page. */ GetFacultiesResponseDto;
export type GetAllFacultiesApiArg = {
  page: string;
  count: string;
  schoolUuid: string;
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
export type HelloApiResponse = unknown;
export type HelloApiArg = void;
export type HelloNoAuthApiResponse = unknown;
export type HelloNoAuthApiArg = void;
export type RequestRepresentativeVerificationApiResponse = unknown;
export type RequestRepresentativeVerificationApiArg = void;
export type GetRepresentativeVerificationRequestsApiResponse =
  /** status 200 Representative verification requests. */ GetRepresentativeRequestsDto;
export type GetRepresentativeVerificationRequestsApiArg = void;
export type VerifyRepresentativeUserApiResponse = unknown;
export type VerifyRepresentativeUserApiArg = {
  verifyRepresentativeUserRequestDto: VerifyRepresentativeUserRequestDto;
};
export type RequestTeacherVerificationApiResponse = unknown;
export type RequestTeacherVerificationApiArg = void;
export type GetTeacherVerificationRequestsApiResponse =
  /** status 200 Teacher verification requests. */ GetTeacherRequestsDto;
export type GetTeacherVerificationRequestsApiArg = void;
export type VerifyTeacherUserApiResponse = unknown;
export type VerifyTeacherUserApiArg = {
  verifyTeacherUserRequestDto: VerifyTeacherUserRequestDto;
};
export type SearchChannelsApiResponse =
  /** status 200 Channels search suggestions. */ GetChannelsSearchSuggestionsResponseDto;
export type SearchChannelsApiArg = {
  getChannelsSearchSuggestionsRequestDto: GetChannelsSearchSuggestionsRequestDto;
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
  value: any;
};
export type ToggleMembershipApiResponse = unknown;
export type ToggleMembershipApiArg = {
  toggleChannelMembershipRequestDto: ToggleChannelMembershipRequestDto;
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
  order?: string;
  page: number;
};
export type VoteOnPostApiResponse = unknown;
export type VoteOnPostApiArg = {
  voteOnPostRequestDto: VoteOnPostRequestDto;
};
export type UserDataResponseDto = {
  email: string;
  username: string;
  role: string;
  accessToken: string;
  uuid: string;
};
export type LogInUserRequestDto = {
  email: string;
  password: string;
};
export type CreateBaseUserDto = {
  email: string;
  password: string;
  role: string;
};
export type CreateRepresentativeUserDto = {
  email: string;
  password: string;
  role: string;
  name: string;
  schoolUuid: string;
};
export type CreateTeacherUserDto = {
  email: string;
  password: string;
  role: string;
  name: string;
  schoolUuid: string;
  facultyUuid: string;
};
export type CreateSchoolDto = {
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
export type DeleteSchoolDto = {
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
export type CreateFacultyDto = {
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
export type DeleteFacultyDto = {
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
export type VerifyRepresentativeUserRequestDto = {
  approve: boolean;
  reason: string;
  verifiedUserUuid: string;
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
export type VerifyTeacherUserRequestDto = {
  approve: boolean;
  reason: string;
  verifiedUserUuid: string;
};
export type ChannelsSearchSuggestionDto = {
  text: string;
  value: string;
};
export type GetChannelsSearchSuggestionsResponseDto = {
  channels: ChannelsSearchSuggestionDto[];
};
export type GetChannelsSearchSuggestionsRequestDto = {
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
  description: string | null;
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
  channelTextId: string;
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
  author: string;
  isAuthor: boolean;
  edited: boolean;
  up: number;
  down: number;
  vote: number;
};
export type GetPostByUuidResponseDto = {
  post: ChannelPostDto;
};
export type GetPostsForChannelResponseDto = {
  isLastPage: boolean;
  posts: ChannelPostDto[];
};
export type VoteOnPostRequestDto = {
  postUuid: string;
  channelTextId: string;
  dir: number;
};
export const {
  useLogInMutation,
  useSignUpBaseMutation,
  useSignUpRepresentativeMutation,
  useSignUpTeacherMutation,
  useRefreshTokenMutation,
  useLogOutMutation,
  useRefreshUsernameQuery,
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
  useHelloQuery,
  useHelloNoAuthQuery,
  useRequestRepresentativeVerificationQuery,
  useGetRepresentativeVerificationRequestsQuery,
  useVerifyRepresentativeUserMutation,
  useRequestTeacherVerificationQuery,
  useGetTeacherVerificationRequestsQuery,
  useVerifyTeacherUserMutation,
  useSearchChannelsMutation,
  useCreateChannelMutation,
  useUpdateChannelMutation,
  useGetChannelByTextIdQuery,
  useCheckChannelIdAvailabilityQuery,
  useToggleMembershipMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostByUuidQuery,
  useGetPostsForChannelQuery,
  useVoteOnPostMutation,
} = injectedRtkApi;
