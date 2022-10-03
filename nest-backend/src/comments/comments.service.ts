import { Injectable, UnauthorizedException } from "@nestjs/common";
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
import GetCommentCommentsResponseDto from "./dto/get-comment-comments-response.dto";
import UpdateCommentRequestDto from "./dto/update-comment-request.dto";
import DeleteCommentRequestDto from "./dto/delete-comment-request.dto";
import VoteOnCommentRequestDto from "./dto/vote-on-comment-request.dto";

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService, private usersService: UsersService) {}

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
    order: CommentsOrder,
    page: number,
  ): Promise<GetCommentsUnderPostResponseDto> {
    const limit = 10;
    const levels = 7; // retrieve one more level than needed to establish the hasMore property
    const query = Prisma.sql`select *
                             from get_post_comments(${postUuid}::uuid, ${user.uuid}::uuid, ${page}::int, ${
      order === "new"
    }::boolean, ${limit}::int,
                                                    ${levels}::int)`;
    const comments = await this.prisma.$queryRaw<PostComment[]>(query);
    const tree: OutPostCommentDto[] = this.constructCommentsTree(comments);
    return {
      hasMore: tree.length > 10,
      comments: tree
        .slice(0, 10)
        // .sort(order === "new" ? CommentsService.sortCommentsByDateCreated : CommentsService.sortCommentsByResVote)
        .map((comment) => this.mapOutCommentToDtoComment(user.uuid, comment, comment.uuid)),
    };
  }

  async getCommentComments(user: UserDto, commentUuid: string): Promise<GetCommentCommentsResponseDto> {
    const levels = 7; // retrieve one more level than needed to establish the hasMore property
    const query = Prisma.sql`select *
                             from get_comment_comments(${commentUuid}::uuid, ${user.uuid}::uuid, ${levels}::int)`;
    const comments = await this.prisma.$queryRaw<PostComment[]>(query);
    const tree = this.constructCommentsTree(comments);
    const rootUuid = await this.getRootCommentUuid(tree[0].uuid);
    return {
      comments: tree.slice(0, 10).map((comment) => this.mapOutCommentToDtoComment(user.uuid, comment, rootUuid)),
    };
  }

  async updateComment(user: UserDto, requestDto: UpdateCommentRequestDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { uuid: requestDto.uuid },
      select: { authorUuid: true },
    });
    if (comment.authorUuid === user.uuid) {
      await this.prisma.comment.update({
        where: {
          uuid: requestDto.uuid,
        },
        data: {
          modified: new Date(),
          body: requestDto.body,
        },
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  async deleteComment(user: UserDto, requestDto: DeleteCommentRequestDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { uuid: requestDto.uuid },
      select: { authorUuid: true },
    });
    if (comment.authorUuid === user.uuid) {
      await this.prisma.comment.delete({ where: { uuid: requestDto.uuid } });
    } else {
      throw new UnauthorizedException();
    }
  }

  async voteOnComment(user: UserDto, requestDto: VoteOnCommentRequestDto) {
    await this.prisma.$transaction(async (tx) => {
      // 1. select from UserCommentVotes
      const userCommentVote = await tx.userCommentVotes.findUnique({
        where: {
          userUuid_commentUuid: {
            userUuid: user.uuid,
            commentUuid: requestDto.uuid,
          },
        },
      });
      // 2. calculate the increment
      let increment: number = requestDto.dir;
      if (userCommentVote && userCommentVote.dir && requestDto.dir === 0) {
        increment = userCommentVote.dir === 1 ? -1 : 1;
      }
      // 3. update UserCommentVotes
      if (requestDto.dir === 1 || requestDto.dir === -1) {
        await tx.comment.update({
          where: { uuid: requestDto.uuid },
          data: {
            votes: {
              upsert: {
                where: {
                  userUuid_commentUuid: {
                    userUuid: user.uuid,
                    commentUuid: requestDto.uuid,
                  },
                },
                create: {
                  userUuid: user.uuid,
                  dir: requestDto.dir,
                },
                update: { dir: requestDto.dir },
              },
            },
            resVote: {
              increment,
            },
          },
        });
      } else if (requestDto.dir === 0) {
        await tx.userCommentVotes.delete({
          where: {
            userUuid_commentUuid: {
              userUuid: user.uuid,
              commentUuid: requestDto.uuid,
            },
          },
        });
      }
    });
  }

  private async getRootCommentUuid(commentUuid: string) {
    const query = Prisma.sql`select uuid from get_comment_root(${commentUuid}::uuid)`;
    const [{ uuid }] = await this.prisma.$queryRaw<[{ uuid: string }]>(query);
    return uuid;
  }

  private constructCommentsTree(comments: PostComment[]): OutPostCommentDto[] {
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
      if (c.parentUuid !== null && commentsMap.get(c.parentUuid) !== undefined) {
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

    return out;
  }

  private mapOutCommentToDtoComment(userUuid, comment: OutPostCommentDto, rootUuid: string): PostCommentDto {
    const childComments: PostCommentDto[] = comment.comments.map((comment) =>
      this.mapOutCommentToDtoComment(userUuid, comment, rootUuid),
    );
    const hasMore = childComments.length > 0 && comment.level === 6;
    return {
      uuid: comment.uuid,
      body: comment.body,
      author: comment.authorUsername,
      isAuthor: comment.authorUuid === userUuid,
      created: comment.created,
      modified: comment.modified,
      edited: comment.created.getTime() !== comment.modified.getTime(),
      up: Number(comment.up),
      down: Number(comment.down),
      dir: comment.dir ?? 0,
      hasMore: hasMore,
      level: comment.level,
      parentUuid: comment.parentUuid,
      rootUuid,
      postUuid: comment.postUuid,
      comments: hasMore ? [] : childComments,
    };
  }
}
