import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { Permission, RequirePermissions } from "../auth/require-permissions/permission.enum";
import { RequirePermissionsGuard } from "../auth/require-permissions/require-permissions.guard";
import GetUserNotificationsResponseDto from "./dto/get-user-notifications-response.dto";
import UserDto from "../auth/dto/user.dto";
import DismissNotificationRequestDto from "./dto/dismiss-notification-request.dto";

@Controller("notifications")
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @ApiOperation({ summary: "Get user notifications." })
  @ApiOkResponse({ type: GetUserNotificationsResponseDto })
  @RequirePermissions(Permission.NOTIFICATION_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/")
  async getUserNotifications(@Req() request): Promise<GetUserNotificationsResponseDto> {
    return await this.notificationsService.getUserNotifications(request.user as UserDto);
  }

  @ApiOperation({ summary: "Dismiss user notification." })
  @RequirePermissions(Permission.NOTIFICATION_DISMISS)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Post("/")
  async dismissUserNotification(@Req() request, @Body() requestDto: DismissNotificationRequestDto) {
    await this.notificationsService.dismissUserNotification(request.user as UserDto, requestDto.notificationUuid);
  }
}
