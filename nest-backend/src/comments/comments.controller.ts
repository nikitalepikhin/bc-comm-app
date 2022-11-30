import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Permission, RequirePermissions } from "../auth/require-permissions/permission.enum";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions/require-permissions.guard";
import UserDto from "../auth/dto/user.dto";
import GetPostCommentsResponseDto from "./dto/get-comments-under-post-response.dto";
import GetPostCommentsParamsDto from "./dto/get-comments-under-post-param.dto";
import GetPostCommentsQueryDto from "./dto/get-post-comments-query.dto";
import CreateCommentRequestDto from "./dto/create-comment-request.dto";
import CreateCommentResponseDto from "./dto/create-comment-response.dto";
import GetCommentCommentsResponseDto from "./dto/get-comment-comments-response.dto";
import GetCommentCommentsParamDto from "./dto/get-comment-comments-param.dto";
import UpdateCommentRequestDto from "./dto/update-comment-request.dto";
import DeleteCommentRequestDto from "./dto/delete-comment-request.dto";
import VoteOnCommentRequestDto from "./dto/vote-on-comment-request.dto";
import { IsVerifiedGuard } from "../auth/verification/is-verified.guard";

@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: "Create a comment under a post." })
  @ApiOkResponse({ description: "UUID of the newly created comment.", type: CreateCommentResponseDto })
  @RequirePermissions(Permission.COMMENT_CREATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Post("/")
  async createComment(@Req() request, @Body() requestDto: CreateCommentRequestDto): Promise<CreateCommentResponseDto> {
    return await this.commentsService.createComment(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Get post comments." })
  @ApiOkResponse({ description: "Post comments.", type: GetPostCommentsResponseDto })
  @RequirePermissions(Permission.COMMENT_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/post/:postUuid")
  async getPostComments(
    @Req() request,
    @Param() params: GetPostCommentsParamsDto,
    @Query() query: GetPostCommentsQueryDto,
  ): Promise<GetPostCommentsResponseDto> {
    return await this.commentsService.getPostComments(
      request.user as UserDto,
      params.postUuid,
      query.order,
      query.page,
      query.after,
    );
  }

  @ApiOperation({ summary: "Get comment comments." })
  @ApiOkResponse({ description: "Comment comments.", type: GetCommentCommentsResponseDto })
  @RequirePermissions(Permission.COMMENT_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/comment/:commentUuid")
  async getCommentComments(@Req() request, @Param() params: GetCommentCommentsParamDto) {
    return await this.commentsService.getCommentComments(request.user as UserDto, params.commentUuid);
  }

  @ApiOperation({ summary: "Update a comment." })
  @RequirePermissions(Permission.COMMENT_UPDATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Put("/")
  async updateComment(@Req() request, @Body() requestDto: UpdateCommentRequestDto) {
    await this.commentsService.updateComment(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Delete a comment." })
  @RequirePermissions(Permission.COMMENT_DELETE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Delete("/")
  async deleteComment(@Req() request, @Body() requestDto: DeleteCommentRequestDto) {
    await this.commentsService.deleteComment(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Vote on a comment" })
  @RequirePermissions(Permission.COMMENT_VOTE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Post("/vote")
  async voteOnComment(@Req() request, @Body() requestDto: VoteOnCommentRequestDto) {
    await this.commentsService.voteOnComment(request.user as UserDto, requestDto);
  }
}
