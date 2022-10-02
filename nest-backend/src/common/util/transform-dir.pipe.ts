import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { DirNumber, DirString } from "../model/dir";

@Injectable()
export class TransformDirPipe implements PipeTransform<{ dir: DirString }, DirNumber> {
  transform(value: { dir: DirString }, metadata: ArgumentMetadata): DirNumber {
    const dir = parseInt(value.dir);
    if (dir !== -1 && dir !== 0 && dir !== 1) {
      throw new BadRequestException("Invalid dir value provided.");
    } else {
      return dir;
    }
  }
}
