import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Permission, RequirePermissions } from "../auth/permission.enum";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions.guard";
import UserDto from "../auth/dto/user.dto";
import GetPostCommentsResponseDto from "./dto/get-comments-under-post-response.dto";
import GetPostCommentsParamsDto from "./dto/get-comments-under-post-params.dto";
import GetPostCommentsQueryDto from "./dto/get-comments-under-post-query.dto";
import CreateCommentRequestDto from "./dto/create-comment-request.dto";
import CreateCommentResponseDto from "./dto/create-comment-response.dto";
import GetCommentCommentsResponseDto from "./dto/get-comment-comments-response.dto";
import GetCommentCommentsParamsDto from "./dto/get-comment-comments-params.dto";

@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: "Create a comment under a post." })
  @ApiOkResponse({ description: "UUID of the newly created comment.", type: CreateCommentResponseDto })
  @RequirePermissions(Permission.COMMENT_CREATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Post("/")
  async createComment(@Req() request, @Body() requestDto: CreateCommentRequestDto): Promise<CreateCommentResponseDto> {
    return await this.commentsService.createComment(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Get post comments." })
  @ApiOkResponse({ description: "Post comments.", type: GetPostCommentsResponseDto })
  @RequirePermissions(Permission.COMMENT_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/post/:postUuid/:order")
  async getPostComments(
    @Req() request,
    @Param() params: GetPostCommentsParamsDto,
    @Query() query: GetPostCommentsQueryDto,
  ): Promise<GetPostCommentsResponseDto> {
    return await this.commentsService.getPostComments(
      request.user as UserDto,
      params.postUuid,
      params.order,
      query.page,
    );
  }

  @ApiOperation({ summary: "Get comment comments." })
  @ApiOkResponse({ description: "Comment comments.", type: GetCommentCommentsResponseDto })
  @RequirePermissions(Permission.COMMENT_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/comment/:commentUuid")
  async getCommentComments(@Req() request, @Param() params: GetCommentCommentsParamsDto) {
    return await this.commentsService.getCommentComments(request.user as UserDto, params.commentUuid);
  }
}
