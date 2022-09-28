import { Injectable } from "@nestjs/common";
import { CommentsOrder } from "./dto/comments-order.enum";
import UserDto from "../auth/dto/user.dto";
import GetCommentsUnderPostResponseDto from "./dto/get-comments-under-post-response.dto";
import { PrismaService } from "../prisma/prisma.service";
import CreateCommentRequestDto from "./dto/create-comment-request.dto";
import { UsersService } from "../users/users.service";
import CreateCommentResponseDto from "./dto/create-comment-response.dto";
import { Prisma } from "@prisma/client";
import { PostComment } from "./model/post-comment";

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService, private usersService: UsersService) {}

  async createComment(user: UserDto, requestDto: CreateCommentRequestDto): Promise<CreateCommentResponseDto> {
    const { username } = await this.usersService.findByUuid(user.uuid);
    return await this.prisma.comment.create({
      data: {
        post: { connect: { uuid: requestDto.postUuid } },
        body: requestDto.body,
        authorUsername: username,
        author: { connect: { uuid: user.uuid } },
        parent: requestDto.parentUuid !== undefined ? { connect: { uuid: requestDto.parentUuid } } : undefined,
      },
      select: {
        uuid: true,
      },
    });
  }

  async getPostComments(
    user: UserDto,
    postUuid: string,
    page: number,
    order: CommentsOrder,
  ): Promise<GetCommentsUnderPostResponseDto> {
    const query = Prisma.sql`select * from get_post_comments(${postUuid}::uuid, ${user.uuid}::uuid, ${page}::int, ${
      order !== "new"
    })`;
    const comments = await this.prisma.$queryRaw<PostComment[]>(query);
    console.log(comments);
    return {
      hasMore: true,
      comments: [],
    };
  }

  // private mapComment(
  //   userUuid: string,
  //   comment: Comment & { childComments: Comment[]; votes: UserCommentVotes[] },
  // ): PostCommentDto {
  //   const vote = comment.votes.find((vote) => vote.userUuid === userUuid);
  //   return {
  //     author: comment.authorUsername,
  //     body: comment.body,
  //     isAuthor: comment.authorUuid === userUuid,
  //     dateCreated: comment.created,
  //     edited: comment.modified.getTime() !== comment.created.getTime(),
  //     up: comment.votes.filter((vote) => vote.dir === 1).length,
  //     down: comment.votes.filter((vote) => vote.dir === -1).length,
  //     dir: vote ? vote.dir : 0,
  //     comments: comment.childComments.map((comment) => this.mapComment(userUuid, comment)),
  //   };
  // }
}
