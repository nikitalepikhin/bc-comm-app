import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<LogInApiResponse, LogInApiArg>({
      query: (queryArg) => ({ url: `/auth/login`, method: "POST", body: queryArg.logInUserRequestDto }),
    }),
    signUp: build.mutation<SignUpApiResponse, SignUpApiArg>({
      query: (queryArg) => ({ url: `/auth/signup/base`, method: "POST", body: queryArg.createBaseUserDto }),
    }),
    refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>({
      query: () => ({ url: `/auth/refresh`, method: "POST" }),
    }),
    logOut: build.mutation<LogOutApiResponse, LogOutApiArg>({
      query: () => ({ url: `/auth/logout`, method: "POST" }),
    }),
    hello: build.query<HelloApiResponse, HelloApiArg>({
      query: () => ({ url: `/test/hello` }),
    }),
    helloNoAuth: build.query<HelloNoAuthApiResponse, HelloNoAuthApiArg>({
      query: () => ({ url: `/test/guest` }),
    }),
    createSchool: build.mutation<CreateSchoolApiResponse, CreateSchoolApiArg>({
      query: (queryArg) => ({ url: `/schools`, method: "POST", body: queryArg.createSchoolDto }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type LogInApiResponse = /** status 201 Authenticated user data */ UserDataResponseDto;
export type LogInApiArg = {
  logInUserRequestDto: LogInUserRequestDto;
};
export type SignUpApiResponse = unknown;
export type SignUpApiArg = {
  createBaseUserDto: CreateBaseUserDto;
};
export type RefreshTokenApiResponse = /** status 201 Authenticated user data */ UserDataResponseDto;
export type RefreshTokenApiArg = void;
export type LogOutApiResponse = unknown;
export type LogOutApiArg = void;
export type HelloApiResponse = unknown;
export type HelloApiArg = void;
export type HelloNoAuthApiResponse = unknown;
export type HelloNoAuthApiArg = void;
export type CreateSchoolApiResponse = unknown;
export type CreateSchoolApiArg = {
  createSchoolDto: CreateSchoolDto;
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
export type CreateSchoolDto = {
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
};
export const {
  useLogInMutation,
  useSignUpMutation,
  useRefreshTokenMutation,
  useLogOutMutation,
  useHelloQuery,
  useHelloNoAuthQuery,
  useCreateSchoolMutation,
} = injectedRtkApi;
