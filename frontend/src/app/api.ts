import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    echoMessage: build.mutation<EchoMessageApiResponse, EchoMessageApiArg>({
      query: (queryArg) => ({
        url: `/api/test/echo`,
        method: "POST",
        body: queryArg.body,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    registerTeacherUser: build.mutation<RegisterTeacherUserApiResponse, RegisterTeacherUserApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/signup/teacher`,
        method: "POST",
        body: queryArg.registerTeacherUserRequestDto,
      }),
    }),
    registerStudentUser: build.mutation<RegisterStudentUserApiResponse, RegisterStudentUserApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/signup/student`,
        method: "POST",
        body: queryArg.registerSimpleUserRequestDto,
      }),
    }),
    registerRepresentativeUser: build.mutation<RegisterRepresentativeUserApiResponse, RegisterRepresentativeUserApiArg>(
      {
        query: (queryArg) => ({
          url: `/api/auth/signup/representative`,
          method: "POST",
          body: queryArg.registerRepresentativeUserRequestDto,
        }),
      }
    ),
    registerAdminUser: build.mutation<RegisterAdminUserApiResponse, RegisterAdminUserApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/signup/admin`,
        method: "POST",
        body: queryArg.registerSimpleUserRequestDto,
      }),
    }),
    refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>({
      query: () => ({ url: `/api/auth/refresh`, method: "POST" }),
    }),
    logOutUser: build.mutation<LogOutUserApiResponse, LogOutUserApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/logout`,
        method: "POST",
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    logInUser: build.mutation<LogInUserApiResponse, LogInUserApiArg>({
      query: (queryArg) => ({ url: `/api/auth/login`, method: "POST", body: queryArg.logInUserRequestDto }),
    }),
    getHelloWorld: build.query<GetHelloWorldApiResponse, GetHelloWorldApiArg>({
      query: (queryArg) => ({ url: `/api/test/`, headers: { Authorization: queryArg.authorization } }),
    }),
    getAllMatchingSchools: build.query<GetAllMatchingSchoolsApiResponse, GetAllMatchingSchoolsApiArg>({
      query: (queryArg) => ({ url: `/api/schools/${queryArg.substring}` }),
    }),
    getAllSchools: build.query<GetAllSchoolsApiResponse, GetAllSchoolsApiArg>({
      query: () => ({ url: `/api/schools/` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type EchoMessageApiResponse = /** status 200 OK */ string;
export type EchoMessageApiArg = {
  authorization: string;
  body: string;
};
export type RegisterTeacherUserApiResponse = /** status 200 OK */ object;
export type RegisterTeacherUserApiArg = {
  registerTeacherUserRequestDto: RegisterTeacherUserRequestDto;
};
export type RegisterStudentUserApiResponse = /** status 200 OK */ object;
export type RegisterStudentUserApiArg = {
  registerSimpleUserRequestDto: RegisterSimpleUserRequestDto;
};
export type RegisterRepresentativeUserApiResponse = /** status 200 OK */ object;
export type RegisterRepresentativeUserApiArg = {
  registerRepresentativeUserRequestDto: RegisterRepresentativeUserRequestDto;
};
export type RegisterAdminUserApiResponse = /** status 200 OK */ object;
export type RegisterAdminUserApiArg = {
  registerSimpleUserRequestDto: RegisterSimpleUserRequestDto;
};
export type RefreshTokenApiResponse = /** status 200 OK */ RefreshTokenResponseDto;
export type RefreshTokenApiArg = void;
export type LogOutUserApiResponse = /** status 200 OK */ object;
export type LogOutUserApiArg = {
  authorization: string;
};
export type LogInUserApiResponse = /** status 200 OK */ LogInUserResponseDto;
export type LogInUserApiArg = {
  logInUserRequestDto: LogInUserRequestDto;
};
export type GetHelloWorldApiResponse = /** status 200 OK */ string;
export type GetHelloWorldApiArg = {
  authorization: string;
};
export type GetAllMatchingSchoolsApiResponse = /** status 200 OK */ GetSchoolsDto;
export type GetAllMatchingSchoolsApiArg = {
  substring: string;
};
export type GetAllSchoolsApiResponse = /** status 200 OK */ GetSchoolsDto;
export type GetAllSchoolsApiArg = void;
export type RegisterTeacherUserRequestDto = {
  email: string;
  password: string;
  name: string;
  school: string;
  department?: string;
};
export type RegisterSimpleUserRequestDto = {
  email: string;
  password: string;
};
export type RegisterRepresentativeUserRequestDto = {
  email: string;
  password: string;
  school: string;
};
export type RefreshTokenResponseDto = {
  access_token?: string;
  email?: string;
  username?: string;
};
export type LogInUserResponseDto = {
  email?: string;
  username?: string;
  access_token?: string;
};
export type LogInUserRequestDto = {
  email?: string;
  password?: string;
};
export type SchoolDto = {
  uuid?: string;
  value?: string;
  country_code?: string;
  address_line_1?: string;
  address_line_2?: string;
  post_index?: string;
  city?: string;
};
export type GetSchoolsDto = {
  schools?: SchoolDto[];
};
export const {
  useEchoMessageMutation,
  useRegisterTeacherUserMutation,
  useRegisterStudentUserMutation,
  useRegisterRepresentativeUserMutation,
  useRegisterAdminUserMutation,
  useRefreshTokenMutation,
  useLogOutUserMutation,
  useLogInUserMutation,
  useGetHelloWorldQuery,
  useGetAllMatchingSchoolsQuery,
  useGetAllSchoolsQuery,
} = injectedRtkApi;
