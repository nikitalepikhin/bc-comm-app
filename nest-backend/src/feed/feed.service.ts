import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import UserDto from "../auth/dto/user.dto";
import GetUserFeedResponseDto from "./dto/get-user-feed-response.dto";

@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  async getUserFeed(user: UserDto, page: number, after: Date): Promise<GetUserFeedResponseDto> {
    const pageSize = 10;
    const posts = await this.prisma.post.findMany({
      where: {
        channel: {
          subscribers: {
            some: {
              user: {
                uuid: user.uuid,
              },
            },
          },
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
        channel: {
          select: {
            textId: true,
          },
        },
        author: true,
      },
      orderBy: {
        created: "desc",
      },
      take: pageSize + 1,
      skip: (page - 1) * pageSize,
    });
    const newPosts = await this.prisma.post.count({
      where: {
        channel: {
          subscribers: {
            some: {
              user: {
                uuid: user.uuid,
              },
            },
          },
        },
        created: {
          gt: after,
        },
      },
      take: 1,
    });
    return {
      hasNew: newPosts > 0,
      hasMore: posts.length > pageSize,
      posts: posts
        .slice(0, 10)
        .map(
          ({
            uuid,
            created,
            modified,
            body,
            title,
            authorUuid,
            channel: { textId },
            authorUsername,
            author: { role },
            votes,
            _count,
          }) => {
            const vote = votes.find((vote) => vote.userUuid === user.uuid);
            return {
              uuid,
              title,
              body,
              channelTextId: textId,
              created,
              modified,
              author: authorUsername,
              isAuthor: authorUuid === user.uuid,
              authorIsTeacher: role === "TEACHER",
              edited: created.getTime() !== modified.getTime(),
              up: votes.filter((vote) => vote.dir === 1).length,
              down: votes.filter((vote) => vote.dir === -1).length,
              dir: vote ? vote.dir : 0,
              commentsCount: _count.comments,
            };
          },
        ),
    };
  }
}
