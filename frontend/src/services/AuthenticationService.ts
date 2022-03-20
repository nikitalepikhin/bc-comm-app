import {
  ApiObjRefreshTokenResponseDto,
  ApiObjRegisterUserRequestDto,
  AuthenticationControllerApi,
} from "../generatedApi";
import { ServiceLogger } from "./ServiceLogger";
import { LogInUserRequestDtoApiObj } from "../generatedApi/model/log-in-user-request-dto-api-obj";
import { LogInUserResponseDtoApiObj } from "../generatedApi/model/log-in-user-response-dto-api-obj";
import globalAxios from "axios";

const logErrorAndRethrow = ServiceLogger.logErrorAndRethrowCreator("AuthenticationService");

globalAxios.defaults.withCredentials = true;

export class AuthenticationService {
  private static controllerApi = new AuthenticationControllerApi();

  public static logInUser(dto: LogInUserRequestDtoApiObj): Promise<LogInUserResponseDtoApiObj> {
    return AuthenticationService.controllerApi
      .logInUser({ apiObjLogInUserRequestDto: dto })
      .then((response) => response.data)
      .catch(logErrorAndRethrow);
  }

  public static refreshToken(): Promise<ApiObjRefreshTokenResponseDto> {
    return AuthenticationService.controllerApi
      .refreshToken()
      .then((response) => response.data)
      .catch(logErrorAndRethrow);
  }

  public static logOutUser(authorization: string): Promise<number> {
    return AuthenticationService.controllerApi
      .logOutUser({ authorization: `Bearer ${authorization}` })
      .then((response) => response.status)
      .catch(logErrorAndRethrow);
  }

  public static signUpUser(dto: ApiObjRegisterUserRequestDto) {
    return AuthenticationService.controllerApi
      .registerUser({ apiObjRegisterUserRequestDto: dto })
      .then((response) => response.status)
      .catch(logErrorAndRethrow);
  }
}
