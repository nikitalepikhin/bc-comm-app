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
export type HelloApiResponse = unknown;
export type HelloApiArg = void;
export type HelloNoAuthApiResponse = unknown;
export type HelloNoAuthApiArg = void;
export type RequestVerificationApiResponse = unknown;
export type RequestVerificationApiArg = void;
export type GetRepresentativeVerificationRequestsApiResponse =
  /** status 200 Representative verification requests. */ GetRepresentativeRequestsDto;
export type GetRepresentativeVerificationRequestsApiArg = void;
export type VerifyRepresentativeUserApiResponse = unknown;
export type VerifyRepresentativeUserApiArg = {
  verifyRepresentativeUserRequestDto: VerifyRepresentativeUserRequestDto;
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
export const {
  useLogInMutation,
  useSignUpBaseMutation,
  useSignUpRepresentativeMutation,
  useRefreshTokenMutation,
  useLogOutMutation,
  useCreateSchoolMutation,
  useGetAllSchoolsQuery,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
  useGetSchoolByUuidQuery,
  useHelloQuery,
  useHelloNoAuthQuery,
  useRequestVerificationQuery,
  useGetRepresentativeVerificationRequestsQuery,
  useVerifyRepresentativeUserMutation,
  useCreateFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useGetAllFacultiesQuery,
  useGetFacultyByUuidQuery,
} = injectedRtkApi;
