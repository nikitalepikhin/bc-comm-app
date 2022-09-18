import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
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
import GetChannelByTextIdResponseDto from "./dto/get-channel-by-text-id-response.dto";
import GetChannelByTextIdParamsDto from "./dto/get-channel-by-text-id-params.dto";
import ToggleChannelMembershipRequestDto from "./dto/toggle-channel-membership-request.dto";
import UpdateChannelRequestDto from "./dto/update-channel-request.dto";
import UpdateChannelResponseDto from "./dto/update-channel-response.dto";

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
  @Post("/")
  async createChannel(@Req() request, @Body() createNewChannelRequest: CreateChannelRequestDto) {
    return await this.channelsService.createChannel(request.user as UserDto, createNewChannelRequest);
  }

  @ApiOperation({ summary: "Update an existing channel." })
  @ApiOkResponse({ description: "Updated values for an existing channel.", type: UpdateChannelResponseDto })
  @RequirePermissions(Permission.CHANNEL_UPDATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Put("/")
  async updateChannel(@Req() request, @Body() requestDto: UpdateChannelRequestDto) {
    return await this.channelsService.updateChannel(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Get channel content based on the channel's text id." })
  @ApiOkResponse({ description: "Channel data", type: GetChannelByTextIdResponseDto })
  @RequirePermissions(Permission.CHANNEL_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/:textId")
  async getChannelByTextId(@Req() request, @Param() params: GetChannelByTextIdParamsDto) {
    return await this.channelsService.getChannelByTextId(params.textId, request.user.uuid);
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

  @ApiOperation({ summary: "Toggle channel membership." })
  @RequirePermissions(Permission.CHANNEL_MEMBER)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Post("/member")
  async toggleMembership(@Req() request, @Body() requestDto: ToggleChannelMembershipRequestDto) {
    return await this.channelsService.toggleMembership(request.user as UserDto, requestDto);
  }
}
