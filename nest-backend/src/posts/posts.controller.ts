import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import CreatePostRequestDto from "./dto/create-post-request.dto";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions/require-permissions.guard";
import { Permission, RequirePermissions } from "../auth/require-permissions/permission.enum";
import { PostsService } from "./posts.service";
import UserDto from "../auth/dto/user.dto";
import GetPostsForChannelParamDto from "./dto/get-posts-for-channel-param.dto";
import GetPostsForChannelResponseDto from "./dto/get-posts-for-channel-response.dto";
import UpdatePostRequestDto from "./dto/update-post-request.dto";
import VoteOnPostRequestDto from "./dto/vote-on-post-request.dto";
import DeletePostRequestDto from "./dto/delete-post-request.dto";
import CreatePostResponseDto from "./dto/create-post-response.dto";
import GetPostByUuidParamDto from "./dto/get-post-by-uuid-param.dto";
import GetPostByUuidResponseDto from "./dto/get-post-by-uuid-response.dto";
import GetPostsForChannelQueryDto from "./dto/get-posts-for-channel-query.dto";
import { IsVerifiedGuard } from "../auth/verification/is-verified.guard";
import { PostsOrder } from "./dto/posts-order.enum";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: "Create a post in a specified channel." })
  @ApiOkResponse({ description: "Uuid of the newly created post.", type: CreatePostResponseDto })
  @RequirePermissions(Permission.POST_CREATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Post("/")
  async createPost(@Req() request, @Body() requestDto: CreatePostRequestDto): Promise<CreatePostResponseDto> {
    return await this.postsService.createPost(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Get post by uuid." })
  @ApiOkResponse({ description: "Post retrieved by uuid.", type: GetPostByUuidResponseDto })
  @RequirePermissions(Permission.POST_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/:postUuid")
  async getPostByUuid(@Req() request, @Param() params: GetPostByUuidParamDto): Promise<GetPostByUuidResponseDto> {
    return await this.postsService.getPostByUuid(request.user as UserDto, params.postUuid);
  }

  @ApiOperation({ summary: "Get posts for a specified channel." })
  @ApiOkResponse({ description: "Posts for a specified channel.", type: GetPostsForChannelResponseDto })
  @RequirePermissions(Permission.POST_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/channel/:channelTextId")
  async getPostsForChannel(
    @Req() request,
    @Param() params: GetPostsForChannelParamDto,
    @Query() query: GetPostsForChannelQueryDto,
  ): Promise<GetPostsForChannelResponseDto> {
    return await this.postsService.getPostsForChannel(
      request.user as UserDto,
      params.channelTextId,
      query.page ?? 1,
      query.order ?? PostsOrder.new,
      query.after ?? new Date(),
    );
  }

  @ApiOperation({ summary: "Update a post with specified uuid." })
  @RequirePermissions(Permission.POST_UPDATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Put("/")
  async updatePost(@Req() request, @Body() requestDto: UpdatePostRequestDto) {
    return await this.postsService.updatePost(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Vote on a post" })
  @RequirePermissions(Permission.POST_VOTE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Post("/vote")
  async voteOnPost(@Req() request, @Body() requestDto: VoteOnPostRequestDto) {
    await this.postsService.voteOnPost(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Delete a post with specified uuid." })
  @RequirePermissions(Permission.POST_DELETE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Delete("/")
  async deletePost(@Req() request, @Body() requestDto: DeletePostRequestDto) {
    await this.postsService.deletePost(request.user as UserDto, requestDto);
  }
}
