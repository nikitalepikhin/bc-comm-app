import { DummyControllerApi } from "../generatedApi";
import { ServiceLogger } from "./ServiceLogger";

const logErrorAndRethrow = ServiceLogger.logErrorAndRethrowCreator("DummyService");

export class DummyService {
  private static controllerApi = new DummyControllerApi();

  public static getHelloWorld(authorization: string): Promise<string> {
    return DummyService.controllerApi
      .getHelloWorld({ authorization: `Bearer ${authorization}` })
      .then((response) => response.data)
      .catch(logErrorAndRethrow);
  }
}
