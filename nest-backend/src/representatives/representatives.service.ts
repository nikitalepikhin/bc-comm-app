import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import GetRepresentativeRequestsDto from "./dto/get-representative-requests.dto";
import VerifyRepresentativeUserRequestDto from "./dto/verify-representative-user-request.dto";

@Injectable()
export class RepresentativesService {
  constructor(private prisma: PrismaService) {}

  async requestVerification(user) {
    await this.prisma.representative.update({ where: { userUuid: user.uuid }, data: { requestsVerification: true } });
  }

  async getRepresentativeVerificationRequests(): Promise<GetRepresentativeRequestsDto> {
    const reps = await this.prisma.representative.findMany({
      where: { verified: false, requestsVerification: true },
      select: {
        user: {
          select: {
            uuid: true,
            username: true,
            email: true,
            created: true,
          },
        },
        school: {
          select: {
            uuid: true,
            name: true,
          },
        },
        name: true,
      },
    });
    return { requests: reps.map((rep) => ({ school: { ...rep.school }, user: { ...rep.user, name: rep.name } })) };
  }

  async verifyRepresentativeUser(user, verifyRepresentativeUserRequest: VerifyRepresentativeUserRequestDto) {
    const representative = await this.prisma.representative.findUnique({
      where: { userUuid: verifyRepresentativeUserRequest.verifiedUserUuid },
    });
    if (verifyRepresentativeUserRequest.approve && !representative.verified) {
      await this.prisma.representative.update({
        where: { userUuid: verifyRepresentativeUserRequest.verifiedUserUuid },
        data: {
          verified: verifyRepresentativeUserRequest.approve,
          verifiedByUserUuid: user.uuid,
          verifiedAt: new Date(),
          requestsVerification: false,
        },
      });
    } else if (!verifyRepresentativeUserRequest.approve && !representative.verified) {
      await this.prisma.representative.update({
        where: { userUuid: verifyRepresentativeUserRequest.verifiedUserUuid },
        data: {
          verified: verifyRepresentativeUserRequest.approve,
          verifiedByUserUuid: user.uuid,
          verificationMessage: verifyRepresentativeUserRequest.reason,
          verifiedAt: new Date(),
          requestsVerification: false,
        },
      });
    } else {
      throw new BadRequestException("This representative is already verified.");
    }
  }
}
