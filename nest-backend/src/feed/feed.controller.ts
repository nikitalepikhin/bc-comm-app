import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Permission, RequirePermissions } from "../auth/require-permissions/permission.enum";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions/require-permissions.guard";
import GetUserFeedQueryDto from "./dto/get-user-feed-query.dto";
import GetUserFeedResponseDto from "./dto/get-user-feed-response.dto";
import { FeedService } from "./feed.service";
import UserDto from "../auth/dto/user.dto";

@Controller("feed")
export class FeedController {
  constructor(private feedService: FeedService) {}

  @ApiOperation({ summary: "Get posts from channels that user is subscribed to." })
  @ApiOkResponse({ description: "Posts from channel that user is subscribed to.", type: GetUserFeedResponseDto })
  @RequirePermissions(Permission.FEED_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/")
  async getUserFeed(@Req() request, @Query() query: GetUserFeedQueryDto): Promise<GetUserFeedResponseDto> {
    return await this.feedService.getUserFeed(request.user as UserDto, query.page, query.after);
  }
}
