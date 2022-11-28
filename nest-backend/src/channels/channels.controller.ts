import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { ChannelsService } from "./channels.service";
import CreateChannelRequestDto from "./dto/create-channel-request.dto";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions/require-permissions.guard";
import { Permission, RequirePermissions } from "../auth/require-permissions/permission.enum";
import UserDto from "../auth/dto/user.dto";
import CheckChannelIdAvailabilityParamDto from "./dto/check-channel-id-availability-param.dto";
import CheckChannelIdAvailabilityResponseDto from "./dto/check-channel-id-availability-response.dto";
import SearchChannelsResponseDto from "./dto/search-channels-response.dto";
import SearchChannelsQueryDto from "./dto/search-channels-query.dto";
import GetChannelByTextIdResponseDto from "./dto/get-channel-by-text-id-response.dto";
import GetChannelByTextIdParamDto from "./dto/get-channel-by-text-id-param.dto";
import ToggleChannelMembershipRequestDto from "./dto/toggle-channel-membership-request.dto";
import UpdateChannelRequestDto from "./dto/update-channel-request.dto";
import UpdateChannelResponseDto from "./dto/update-channel-response.dto";
import { IsVerifiedGuard } from "../auth/verification/is-verified.guard";
import DeleteChannelParamDto from "./dto/delete-channel-param.dto";

@Controller("channels")
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @ApiOperation({
    summary: "Search for channels based on their name or text ID.",
  })
  @ApiOkResponse({
    description: "Suggested channels based on the provided value.",
    type: SearchChannelsResponseDto,
    content: {},
  })
  @RequirePermissions(Permission.CHANNEL_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/search")
  async searchChannels(@Query() query: SearchChannelsQueryDto): Promise<SearchChannelsResponseDto> {
    if (query.value.length > 0) {
      return await this.channelsService.searchChannels(query.value);
    } else {
      return { channels: [] };
    }
  }

  @ApiOperation({ summary: "Create a new channel." })
  @RequirePermissions(Permission.CHANNEL_CREATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Post("/")
  async createChannel(@Req() request, @Body() createNewChannelRequest: CreateChannelRequestDto) {
    return await this.channelsService.createChannel(request.user as UserDto, createNewChannelRequest);
  }

  @ApiOperation({ summary: "Update an existing channel." })
  @ApiOkResponse({ description: "Updated values for an existing channel.", type: UpdateChannelResponseDto })
  @RequirePermissions(Permission.CHANNEL_UPDATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Put("/")
  async updateChannel(@Req() request, @Body() requestDto: UpdateChannelRequestDto) {
    return await this.channelsService.updateChannel(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Get channel content based on the channel's text id." })
  @ApiOkResponse({ description: "Channel data", type: GetChannelByTextIdResponseDto })
  @RequirePermissions(Permission.CHANNEL_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/:textId")
  async getChannelByTextId(
    @Req() request,
    @Param() params: GetChannelByTextIdParamDto,
  ): Promise<GetChannelByTextIdResponseDto> {
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
    @Param() params: CheckChannelIdAvailabilityParamDto,
  ): Promise<CheckChannelIdAvailabilityResponseDto> {
    return await this.channelsService.checkChannelIdAvailability(params.value);
  }

  @ApiOperation({ summary: "Toggle channel membership." })
  @RequirePermissions(Permission.CHANNEL_MEMBER)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Post("/member")
  async toggleMembership(@Req() request, @Body() requestDto: ToggleChannelMembershipRequestDto) {
    return await this.channelsService.toggleMembership(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Delete a channel." })
  @RequirePermissions(Permission.CHANNEL_DELETE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Delete("/:uuid")
  async deleteChannel(@Req() request, @Param() params: DeleteChannelParamDto) {
    return await this.channelsService.deleteChannel(request.user as UserDto, params.uuid);
  }
}
