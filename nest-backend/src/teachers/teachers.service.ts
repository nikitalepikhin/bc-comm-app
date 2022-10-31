import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import GetTeacherByUsernameRequestDto from "./dto/get-teacher-by-username-request.dto";
import GetTeacherByUsernameResponseDto from "./dto/get-teacher-by-username-response.dto";

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

  async getTeacherByUsername(username: string): Promise<GetTeacherByUsernameResponseDto> {
    const teacher = await this.prisma.teacher.findFirst({
      where: { user: { username } },
      include: { user: true, school: true, faculty: true },
    });
    if (teacher === null || !teacher.verified) {
      throw new NotFoundException();
    }
    return {
      name: teacher.name,
      username: teacher.user.username,
      school: teacher.school.name,
      faculty: teacher.faculty.name,
      bio: teacher.bio,
    };
  }
}
