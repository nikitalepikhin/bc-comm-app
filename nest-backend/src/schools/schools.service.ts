import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import CreateSchoolDto from "./dto/create-school.dto";
import ValidateUserDto from "../users/dto/validate-user.dto";

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  async createSchool(schoolDto: CreateSchoolDto, userDto: ValidateUserDto) {
    return await this.prisma.school.create({
      data: { ...schoolDto, createdByUuid: userDto.uuid, modifiedByUuid: userDto.uuid },
    });
  }

  async getSchoolByUuid(schoolUuid: string) {
    return await this.prisma.school.findUnique({ where: { uuid: schoolUuid } });
  }
}
