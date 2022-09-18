import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import CreatePostRequestDto from "./dto/create-post-request.dto";
import UserDto from "../auth/dto/user.dto";
import GetPostsForChannelResponseDto from "./dto/get-posts-for-channel-response.dto";
import UpdatePostRequestDto from "./dto/update-post-request.dto";
import VoteOnPostRequestDto from "./dto/vote-on-post-request.dto";
import DeletePostRequestDto from "./dto/delete-post-request.dto";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(user: UserDto, requestDto: CreatePostRequestDto) {
    await this.prisma.post.create({
      data: {
        title: requestDto.title,
        body: requestDto.body,
        channel: {
          connect: {
            uuid: requestDto.channelUuid,
          },
        },
        author: {
          connect: {
            uuid: user.uuid,
          },
        },
      },
    });
  }

  async getPostsForChannel(channelTextId: string): Promise<GetPostsForChannelResponseDto> {
    return {
      posts: (
        await this.prisma.post.findMany({
          where: {
            channel: {
              textId: channelTextId,
            },
          },
          select: {
            title: true,
            body: true,
            created: true,
            modified: true,
            votes: true,
          },
        })
      ).map(({ title, body, created, modified, votes }) => ({
        title,
        body,
        created,
        edited: created === modified,
        up: votes.filter((vote) => vote.dir === 1).length,
        down: votes.filter((vote) => vote.dir === -1).length,
      })),
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
        data: { body: requestDto.body },
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
}
