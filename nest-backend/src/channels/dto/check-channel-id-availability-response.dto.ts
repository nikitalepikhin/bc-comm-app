import { ApiProperty } from "@nestjs/swagger";

export default class CheckChannelIdAvailabilityResponseDto {
  @ApiProperty()
  exists: boolean;
}
