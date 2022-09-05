import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { ChannelsService } from "./channels.service";
import CreateChannelRequestDto from "./dto/create-channel-request.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions.guard";
import { Permission, RequirePermissions } from "../auth/permission.enum";
import UserDto from "../auth/dto/user.dto";
import CheckChannelIdAvailabilityPathParamDto from "./dto/check-channel-id-availability-path-param.dto";
import CheckChannelIdAvailabilityResponseDto from "./dto/check-channel-id-availability-response.dto";
import GetChannelsSearchSuggestionsResponseDto from "./dto/get-channels-search-suggestions-response.dto";
import GetChannelsSearchSuggestionsRequestDto from "./dto/get-channels-search-suggestions-request.dto";

@Controller("channels")
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @ApiOperation({
    summary: "Get channels search suggestions.",
  })
  @ApiOkResponse({
    description: "Channels search suggestions.",
    type: GetChannelsSearchSuggestionsResponseDto,
    content: {},
  })
  @RequirePermissions(Permission.CHANNEL_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Post("/search")
  async searchChannels(
    @Body() getChannelsSearchSuggestions: GetChannelsSearchSuggestionsRequestDto,
  ): Promise<GetChannelsSearchSuggestionsResponseDto> {
    if (getChannelsSearchSuggestions.value.length > 0) {
      return await this.channelsService.searchChannels(getChannelsSearchSuggestions);
    } else {
      return { channels: [] };
    }
  }

  @ApiOperation({ summary: "Create a new channel." })
  @RequirePermissions(Permission.CHANNEL_CREATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Post("/new")
  async createChannel(@Req() request, @Body() createNewChannelRequest: CreateChannelRequestDto) {
    return await this.channelsService.createChannel(request.user as UserDto, createNewChannelRequest);
  }

  @ApiOperation({ summary: "Check channel text id availability." })
  @ApiParam({ name: "value", description: "Text ID value to check." })
  @ApiOkResponse({
    description: "Channel text ID if exists.",
    type: CheckChannelIdAvailabilityResponseDto,
    content: {},
  })
  @RequirePermissions(Permission.CHANNEL_CREATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/new/check/:value")
  async checkChannelIdAvailability(
    @Param() params: CheckChannelIdAvailabilityPathParamDto,
  ): Promise<CheckChannelIdAvailabilityResponseDto> {
    return await this.channelsService.checkChannelIdAvailability(params.value);
  }
}
