import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import CreateChannelRequestDto from "./dto/create-channel-request.dto";
import UserDto from "../auth/dto/user.dto";
import CheckChannelIdAvailabilityResponseDto from "./dto/check-channel-id-availability-response.dto";
import SearchChannelsResponseDto from "./dto/search-channels-response.dto";
import GetChannelByTextIdResponseDto from "./dto/get-channel-by-text-id-response.dto";
import ToggleChannelMembershipRequestDto from "./dto/toggle-channel-membership-request.dto";
import UpdateChannelRequestDto from "./dto/update-channel-request.dto";
import UpdateChannelResponseDto from "./dto/update-channel-response.dto";
import { UsersService } from "../users/users.service";
import { Teacher } from "@prisma/client";

@Injectable()
export class ChannelsService {
  constructor(
    private prisma: PrismaService,

    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async createChannel(user: UserDto, createNewChannelRequest: CreateChannelRequestDto): Promise<void> {
    try {
      await this.prisma.channel.create({
        data: {
          textId: createNewChannelRequest.textId,
          name: createNewChannelRequest.name,
          description: createNewChannelRequest.description,
          createdByUuid: user.uuid,
          modifiedByUuid: user.uuid,
        },
      });
    } catch (e) {
      if (e.code === "P2002") {
        throw new BadRequestException("The specified text ID already exists.");
      } else {
        throw e;
      }
    }
  }

  async updateChannel(user: UserDto, requestDto: UpdateChannelRequestDto): Promise<UpdateChannelResponseDto> {
    const channel = await this.prisma.channel.findUnique({
      where: { uuid: requestDto.uuid },
      select: { createdByUuid: true },
    });
    if (channel.createdByUuid !== user.uuid) {
      throw new UnauthorizedException();
    } else {
      return await this.prisma.channel.update({
        where: { uuid: requestDto.uuid },
        data: {
          name: requestDto.name,
          textId: requestDto.textId,
          description: requestDto.description,
          modifiedByUuid: user.uuid,
          modified: new Date(),
        },
        select: {
          name: true,
          textId: true,
          description: true,
        },
      });
    }
  }

  async checkChannelIdAvailability(value: string): Promise<CheckChannelIdAvailabilityResponseDto> {
    try {
      await this.prisma.channel.findFirstOrThrow({
        select: { textId: true },
        where: {
          textId: {
            equals: value,
            mode: "insensitive",
          },
        },
      });
      return { exists: true };
    } catch (e) {
      if (e.name.toString().toLowerCase().includes("notfounderror") || e.code === "P2023") {
        return { exists: false };
      } else {
        throw new BadRequestException();
      }
    }
  }

  async searchChannels(value: string): Promise<SearchChannelsResponseDto> {
    const channels = await this.prisma.channel.findMany({
      where: {
        OR: [
          {
            textId: {
              contains: value,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: value,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return {
      channels: channels.map((channel) => ({ text: `${channel.name} (${channel.textId})`, value: channel.textId })),
    };
  }

  async getChannelByTextId(textId: string, userUuid: string): Promise<GetChannelByTextIdResponseDto> {
    try {
      const channel = await this.prisma.channel.findUniqueOrThrow({
        where: { textId },
        select: {
          uuid: true,
          textId: true,
          name: true,
          description: true,
          subscribers: true,
          created: true,
          createdBy: true,
          _count: {
            select: { subscribers: true },
          },
        },
      });
      let teacher: Teacher | undefined;
      if (channel.createdBy.role === "TEACHER") {
        teacher = await this.usersService.findTeacherByUuid(channel.createdBy.uuid);
      }
      return {
        uuid: channel.uuid,
        textId: channel.textId,
        name: channel.name,
        description: channel.description,
        created: channel.created,
        memberCount: channel._count.subscribers,
        isMember: !!channel.subscribers.find((sub) => sub.userUuid === userUuid),
        isOwner: channel.createdBy.uuid === userUuid,
        owner: {
          role: channel.createdBy.role,
          username: channel.createdBy.username,
          name: teacher ? teacher.name : undefined,
        },
      };
    } catch (e) {
      if (e.name.toString().toLowerCase().includes("notfounderror") || e.code === "P2023") {
        throw new NotFoundException();
      } else {
        throw e;
      }
    }
  }

  async toggleMembership(user: UserDto, requestDto: ToggleChannelMembershipRequestDto): Promise<void> {
    const membership = await this.prisma.channelSubscribedUsers.findUnique({
      where: { userUuid_channelUuid: { userUuid: user.uuid, channelUuid: requestDto.channelUuid } },
    });
    if (membership !== null) {
      await this.prisma.channelSubscribedUsers.delete({
        where: { userUuid_channelUuid: { userUuid: user.uuid, channelUuid: requestDto.channelUuid } },
      });
    } else {
      await this.prisma.channelSubscribedUsers.create({
        data: { userUuid: user.uuid, channelUuid: requestDto.channelUuid },
      });
    }
  }

  async deleteChannel(user: UserDto, channelUuid: string) {
    await this.prisma.$transaction(async (tx) => {
      try {
        const channel = await tx.channel.findFirstOrThrow({ where: { uuid: channelUuid } });
        if (channel.createdByUuid !== user.uuid) {
          throw new UnauthorizedException();
        }
        await this.prisma.channel.delete({ where: { uuid: channelUuid } });
      } catch (e) {
        if (e.name.toString().toLowerCase().includes("notfounderror") || e.code === "P2023") {
          throw new NotFoundException();
        } else {
          throw e;
        }
      }
    });
  }
}
