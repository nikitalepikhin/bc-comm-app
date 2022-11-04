import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUppercase, IsUUID, Matches, MaxLength, MinLength } from "class-validator";

export default class UpdateSchoolRequestDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  @IsUppercase()
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @ApiProperty()
  addressLineOne: string;

  @IsString()
  @MaxLength(256)
  @ApiProperty()
  addressLineTwo: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @Matches(/^[a-zA-Z0-9\- ]{3,10}$/)
  @ApiProperty()
  postalCode: string;
}
