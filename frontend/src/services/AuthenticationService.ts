import { AuthenticationControllerApi, LogInUserRequest } from "../api/noauth";

export class AuthenticationService {
  private controllerApi = new AuthenticationControllerApi();

  public logInUser(request: LogInUserRequest) {
    return this.controllerApi
      .logInUserUsingPOST(request)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }
}
