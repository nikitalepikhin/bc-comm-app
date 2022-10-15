import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import CreatePostRequestDto from "./dto/create-post-request.dto";
import UserDto from "../auth/dto/user.dto";
import GetPostsForChannelResponseDto from "./dto/get-posts-for-channel-response.dto";
import UpdatePostRequestDto from "./dto/update-post-request.dto";
import VoteOnPostRequestDto from "./dto/vote-on-post-request.dto";
import DeletePostRequestDto from "./dto/delete-post-request.dto";
import CreatePostResponseDto from "./dto/create-post-response.dto";
import GetPostByUuidResponseDto from "./dto/get-post-by-uuid-response.dto";
import { UsersService } from "../users/users.service";
import { PostsOrder } from "./dto/posts-order.enum";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService, private usersService: UsersService) {}

  async createPost(user: UserDto, requestDto: CreatePostRequestDto): Promise<CreatePostResponseDto> {
    const { username } = await this.usersService.findByUuid(user.uuid);
    return {
      uuid: (
        await this.prisma.post.create({
          data: {
            title: requestDto.title,
            body: requestDto.body,
            channel: {
              connect: {
                uuid: requestDto.channelUuid,
              },
            },
            authorUsername: username,
            author: {
              connect: {
                uuid: user.uuid,
              },
            },
          },
        })
      ).uuid,
    };
  }

  async getPostByUuid(user: UserDto, postUuid: string): Promise<GetPostByUuidResponseDto> {
    try {
      const post = await this.prisma.post.findUniqueOrThrow({
        where: { uuid: postUuid },
        include: { votes: true, _count: { select: { comments: true } } },
      });
      const vote = await this.prisma.userPostVotes.findUnique({
        where: {
          userUuid_postUuid: {
            postUuid,
            userUuid: user.uuid,
          },
        },
      });
      return {
        post: {
          uuid: post.uuid,
          title: post.title,
          body: post.body,
          created: post.created,
          modified: post.modified,
          author: post.authorUsername,
          isAuthor: post.authorUuid === user.uuid,
          edited: post.created.getTime() !== post.modified.getTime(),
          up: post.votes.filter((vote) => vote.dir === 1).length,
          down: post.votes.filter((vote) => vote.dir === -1).length,
          dir: vote ? vote.dir : 0,
          commentsCount: post._count.comments,
        },
      };
    } catch (e) {
      if (e.name.toString().toLowerCase().includes("notfounderror")) {
        throw new NotFoundException();
      } else {
        throw e;
      }
    }
  }

  async getPostsForChannel(
    user: UserDto,
    channelTextId: string,
    page: number,
    order: PostsOrder,
    after: Date,
  ): Promise<GetPostsForChannelResponseDto> {
    const pageSize = 10;
    const posts = await this.prisma.post.findMany({
      where: {
        channel: {
          textId: channelTextId,
        },
        created: {
          lte: after,
        },
      },
      include: {
        votes: true,
        _count: {
          select: { comments: true },
        },
      },
      orderBy: {
        created: order === "new" ? "desc" : undefined,
        resVote: order === "top" ? "desc" : undefined,
      },
      skip: (page - 1) * pageSize,
      take: pageSize + 1,
    });
    return {
      hasMore: posts.length > pageSize,
      posts: posts
        .slice(0, 10)
        .map(({ uuid, title, body, created, modified, votes, authorUsername, authorUuid, _count }) => {
          const vote = votes.find((vote) => vote.userUuid === user.uuid);
          return {
            uuid,
            title,
            body,
            created,
            modified,
            author: authorUsername,
            isAuthor: authorUuid === user.uuid,
            edited: created.getTime() !== modified.getTime(),
            up: votes.filter((vote) => vote.dir === 1).length,
            down: votes.filter((vote) => vote.dir === -1).length,
            dir: vote ? vote.dir : 0,
            commentsCount: _count.comments,
          };
        }),
    };
  }

  async updatePost(user: UserDto, requestDto: UpdatePostRequestDto) {
    const post = await this.prisma.post.findUnique({
      where: {
        uuid: requestDto.postUuid,
      },
      select: {
        author: {
          select: {
            uuid: true,
          },
        },
      },
    });
    if (post.author.uuid === user.uuid) {
      await this.prisma.post.update({
        where: { uuid: requestDto.postUuid },
        data: { body: requestDto.body, modified: new Date() },
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  async voteOnPost(user: UserDto, requestDto: VoteOnPostRequestDto) {
    await this.prisma.$transaction(async (tx) => {
      // 1. select from UserPostVotes
      const userPostVote = await tx.userPostVotes.findUnique({
        where: {
          userUuid_postUuid: {
            userUuid: user.uuid,
            postUuid: requestDto.uuid,
          },
        },
      });
      // 2. calculate the increment
      let increment: number = requestDto.dir;
      if (userPostVote && userPostVote.dir && requestDto.dir === 0) {
        increment = userPostVote.dir === 1 ? -1 : 1;
      }
      // 3. update UserPostVotes
      if (requestDto.dir === 1 || requestDto.dir === -1) {
        await tx.post.update({
          where: { uuid: requestDto.uuid },
          data: {
            votes: {
              upsert: {
                where: {
                  userUuid_postUuid: {
                    userUuid: user.uuid,
                    postUuid: requestDto.uuid,
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
        await tx.userPostVotes.delete({
          where: {
            userUuid_postUuid: {
              userUuid: user.uuid,
              postUuid: requestDto.uuid,
            },
          },
        });
        await tx.post.update({
          where: { uuid: requestDto.uuid },
          data: {
            resVote: {
              increment,
            },
          },
        });
      }
    });
  }

  async deletePost(user: UserDto, requestDto: DeletePostRequestDto) {
    const post = await this.prisma.post.findUnique({
      where: { uuid: requestDto.postUuid },
      select: { authorUuid: true },
    });
    if (post.authorUuid === user.uuid) {
      await this.prisma.post.delete({ where: { uuid: requestDto.postUuid } });
    } else {
      throw new UnauthorizedException();
    }
  }
}
