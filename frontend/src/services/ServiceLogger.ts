import log from "loglevel";

export class ServiceLogger {
  public static logErrorAndRethrowCreator(serviceName: string): (e: Error) => never {
    return (e: Error) => {
      log.error(`Error in ${serviceName}`, e);
      throw e;
    };
  }

  public static logErrorAndIgnoreCreator(serviceName: string): (e: Error) => void {
    return (e: Error) => log.error(`Error in ${serviceName}`, e);
  }
}
