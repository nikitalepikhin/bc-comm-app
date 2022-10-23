import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import GetRepresentativeRequestsDto from "./dto/get-representative-requests.dto";

@Injectable()
export class RepresentativesService {
  constructor(private prisma: PrismaService) {}

  async getVerificationRequests(): Promise<GetRepresentativeRequestsDto> {
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
}
