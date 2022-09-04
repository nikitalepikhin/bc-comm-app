import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import VerifyTeacherUserRequestDto from "./dto/verify-teacher-user-request.dto";
import UserDto from "../auth/dto/user.dto";

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async requestVerification(user) {
    await this.prisma.representative.update({ where: { userUuid: user.uuid }, data: { requestsVerification: true } });
  }

  async getTeacherVerificationRequests() {
    const teachers = await this.prisma.teacher.findMany({
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
        faculty: {
          select: {
            uuid: true,
            name: true,
          },
        },
        name: true,
      },
    });
    return {
      requests: teachers.map((teacher) => ({
        school: { ...teacher.school },
        faculty: { ...teacher.faculty },
        user: { ...teacher.user, name: teacher.name },
      })),
    };
  }

  async verifyTeacherUser(user: UserDto, requestDto: VerifyTeacherUserRequestDto) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { userUuid: requestDto.verifiedUserUuid },
    });
    if (requestDto.approve && !teacher.verified) {
      await this.prisma.teacher.update({
        where: { userUuid: requestDto.verifiedUserUuid },
        data: {
          verified: requestDto.approve,
          verifiedByUserUuid: user.uuid,
          verifiedAt: new Date(),
          requestsVerification: false,
        },
      });
    } else if (!requestDto.approve && !teacher.verified) {
      await this.prisma.teacher.update({
        where: { userUuid: requestDto.verifiedUserUuid },
        data: {
          verified: requestDto.approve,
          verifiedByUserUuid: user.uuid,
          verificationMessage: requestDto.reason,
          verifiedAt: new Date(),
          requestsVerification: false,
        },
      });
    } else {
      throw new BadRequestException("This teacher is already verified.");
    }
  }
}
