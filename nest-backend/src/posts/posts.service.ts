import { Injectable, UnauthorizedException } from "@nestjs/common";
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

  async getPostsForChannel(user: UserDto, channelTextId: string): Promise<GetPostsForChannelResponseDto> {
    return {
      posts: (
        await this.prisma.post.findMany({
          where: {
            channel: {
              textId: channelTextId,
            },
          },
          include: {
            votes: true,
          },
        })
      ).map(({ uuid, title, body, created, modified, votes, authorUsername }) => {
        const vote = votes.find((vote) => vote.userUuid === user.uuid);
        return {
          uuid,
          title,
          body,
          created,
          author: authorUsername,
          edited: created.getTime() !== modified.getTime(),
          up: votes.filter((vote) => vote.dir === 1).length,
          down: votes.filter((vote) => vote.dir === -1).length,
          vote: vote ? vote.dir : 0,
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
    if (requestDto.dir === 1 || requestDto.dir === -1) {
      await this.prisma.post.update({
        where: { uuid: requestDto.postUuid },
        data: {
          votes: {
            upsert: {
              where: {
                userUuid_postUuid: {
                  userUuid: user.uuid,
                  postUuid: requestDto.postUuid,
                },
              },
              create: {
                userUuid: user.uuid,
                dir: requestDto.dir,
              },
              update: { dir: requestDto.dir },
            },
          },
        },
      });
    } else if (requestDto.dir === 0) {
      await this.prisma.userPostVotes.delete({
        where: {
          userUuid_postUuid: {
            userUuid: user.uuid,
            postUuid: requestDto.postUuid,
          },
        },
      });
    }
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

  async getPostByUuid(user: UserDto, postUuid: string): Promise<GetPostByUuidResponseDto> {
    const post = await this.prisma.post.findUnique({ where: { uuid: postUuid }, include: { votes: true } });
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
        author: post.authorUsername,
        edited: post.created === post.modified,
        up: post.votes.filter((vote) => vote.dir === 1).length,
        down: post.votes.filter((vote) => vote.dir === -1).length,
        vote: vote ? vote.dir : 0,
      },
    };
  }
}