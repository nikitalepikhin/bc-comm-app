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
import { OutPostCommentDto } from "./model/out-post-comment.dto";
import PostCommentDto from "./dto/post-comment.dto";

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
    const limit = 10;
    const levels = 6;
    const query = Prisma.sql`select * from get_post_comments(${postUuid}::uuid, ${
      user.uuid
    }::uuid, ${page}::int, ${limit}::int, ${levels + 1}::int)`;
    const comments = await this.prisma.$queryRaw<PostComment[]>(query);

    // 1. create a map
    const commentsMap = new Map<string, OutPostCommentDto>();
    comments.forEach((c) => {
      if (!commentsMap.has(c.uuid)) {
        commentsMap.set(c.uuid, {
          ...c,
          comments: [],
        });
      }
    });

    // 2. populate child comments arrays
    comments.forEach((c) => {
      if (c.parentUuid !== null) {
        commentsMap.get(c.parentUuid).comments.push(commentsMap.get(c.uuid));
      }
    });

    // 3. create the resulting array of root comments
    const out: OutPostCommentDto[] = [];
    comments.forEach((c) => {
      if (c.level === 1) {
        out.push(commentsMap.get(c.uuid));
      }
    });

    return {
      hasMore: out.length > 10,
      comments: out
        .sort(order === "new" ? CommentsService.sortCommentsByDateCreated : CommentsService.sortCommentsByResVote)
        .map((comment) => this.mapOutCommentToDtoComment(user.uuid, comment)),
    };
  }

  private mapOutCommentToDtoComment(userUuid, comment: OutPostCommentDto): PostCommentDto {
    const childComments: PostCommentDto[] = comment.comments.map((comment) =>
      this.mapOutCommentToDtoComment(userUuid, comment),
    );
    let children: PostCommentDto[] | boolean = childComments;
    if (childComments.length > 0 && comment.level === 6) {
      children = true;
    }
    return {
      uuid: comment.uuid,
      body: comment.body,
      author: comment.authorUsername,
      isAuthor: comment.authorUuid === userUuid,
      dateCreated: comment.created,
      edited: comment.created.getTime() !== comment.modified.getTime(),
      up: Number(comment.up),
      down: Number(comment.down),
      dir: comment.dir ?? 0,
      comments: children,
    };
  }

  private static sortCommentsByDateCreated(first: OutPostCommentDto, second: OutPostCommentDto) {
    if (first.created.getTime() < second.created.getTime()) return 1;
    else if (first.created.getTime() > second.created.getTime()) return -1;
    else return 0;
  }

  private static sortCommentsByResVote(first: OutPostCommentDto, second: OutPostCommentDto) {
    if (first.resVote < second.resVote) return 1;
    else if (first.resVote > second.resVote) return -1;
    else return 0;
  }
}
