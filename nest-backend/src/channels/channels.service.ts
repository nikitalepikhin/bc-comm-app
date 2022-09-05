import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import CreateChannelRequestDto from "./dto/create-channel-request.dto";
import UserDto from "../auth/dto/user.dto";
import CheckChannelIdAvailabilityPathParamDto from "./dto/check-channel-id-availability-path-param.dto";
import CheckChannelIdAvailabilityResponseDto from "./dto/check-channel-id-availability-response.dto";
import GetChannelsSearchSuggestionsRequestDto from "./dto/get-channels-search-suggestions-request.dto";
import GetChannelsSearchSuggestionsResponseDto from "./dto/get-channels-search-suggestions-response.dto";

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}

  async createChannel(user: UserDto, createNewChannelRequest: CreateChannelRequestDto) {
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
      if (e.name.toString().toLowerCase().includes("notfounderror")) {
        return { exists: false };
      } else {
        throw new BadRequestException();
      }
    }
  }

  async searchChannels(
    getChannelsSearchSuggestions: GetChannelsSearchSuggestionsRequestDto,
  ): Promise<GetChannelsSearchSuggestionsResponseDto> {
    return {
      channels: (
        await this.prisma.channel.findMany({
          where: {
            OR: [
              {
                textId: {
                  contains: getChannelsSearchSuggestions.value,
                  mode: "insensitive",
                },
              },
              {
                name: {
                  contains: getChannelsSearchSuggestions.value,
                  mode: "insensitive",
                },
              },
            ],
          },
        })
      ).map((channel) => ({ text: `${channel.name} (${channel.textId})`, value: channel.textId })),
    };
  }
}
