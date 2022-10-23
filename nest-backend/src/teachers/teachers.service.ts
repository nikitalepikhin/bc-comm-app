import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async getVerificationRequests() {
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
}
