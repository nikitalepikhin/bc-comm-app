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
    refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>({
      query: () => ({ url: `/auth/refresh`, method: "POST" }),
    }),
    logOut: build.mutation<LogOutApiResponse, LogOutApiArg>({
      query: () => ({ url: `/auth/logout`, method: "POST" }),
    }),
    createSchool: build.mutation<CreateSchoolApiResponse, CreateSchoolApiArg>({
      query: (queryArg) => ({ url: `/schools`, method: "POST", body: queryArg.createSchoolDto }),
    }),
    hello: build.query<HelloApiResponse, HelloApiArg>({
      query: () => ({ url: `/test/hello` }),
    }),
    helloNoAuth: build.query<HelloNoAuthApiResponse, HelloNoAuthApiArg>({
      query: () => ({ url: `/test/guest` }),
    }),
    requestVerification: build.query<RequestVerificationApiResponse, RequestVerificationApiArg>({
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
export type RefreshTokenApiResponse = /** status 201 Authenticated user data */ UserDataResponseDto;
export type RefreshTokenApiArg = void;
export type LogOutApiResponse = unknown;
export type LogOutApiArg = void;
export type CreateSchoolApiResponse = unknown;
export type CreateSchoolApiArg = {
  createSchoolDto: CreateSchoolDto;
};
export type HelloApiResponse = unknown;
export type HelloApiArg = void;
export type HelloNoAuthApiResponse = unknown;
export type HelloNoAuthApiArg = void;
export type RequestVerificationApiResponse = unknown;
export type RequestVerificationApiArg = void;
export type GetRepresentativeVerificationRequestsApiResponse =
  /** status 201 Representative verification requests. */ GetRepresentativeRequestsDto;
export type GetRepresentativeVerificationRequestsApiArg = void;
export type VerifyRepresentativeUserApiResponse = unknown;
export type VerifyRepresentativeUserApiArg = {
  verifyRepresentativeUserRequestDto: VerifyRepresentativeUserRequestDto;
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
export type CreateSchoolDto = {
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
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
export const {
  useLogInMutation,
  useSignUpBaseMutation,
  useSignUpRepresentativeMutation,
  useRefreshTokenMutation,
  useLogOutMutation,
  useCreateSchoolMutation,
  useHelloQuery,
  useHelloNoAuthQuery,
  useRequestVerificationQuery,
  useGetRepresentativeVerificationRequestsQuery,
  useVerifyRepresentativeUserMutation,
} = injectedRtkApi;
