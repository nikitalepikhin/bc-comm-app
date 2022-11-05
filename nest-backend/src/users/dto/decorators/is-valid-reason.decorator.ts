import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import VerifyUserRequestDto from "../verify-user-request.dto";
import { isNil } from "@nestjs/common/utils/shared.utils";

export function IsValidReason(property: string, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isValidReason",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const requestDto = args.object as VerifyUserRequestDto;
          if (requestDto.approve && requestDto.reason) {
            return false;
          }
          if (!requestDto.approve && isNil(requestDto.reason)) {
            return false;
          }
          return true;
        },
      },
    });
  };
}
