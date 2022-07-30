import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import CreateSchoolDto from "./dto/create-school.dto";
import ValidateUserDto from "../users/dto/validate-user.dto";
import { SchoolResponseDto } from "./dto/school-response.dto";
import GetSchoolsResponseDto from "./dto/get-schools-response.dto";
import { DeleteSchoolDto } from "./dto/delete-school.dto";

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

  async getSchools(page: number, count: number): Promise<GetSchoolsResponseDto> {
    const allSchools = await this.prisma.school.findMany();
    const schools = await this.prisma.school.findMany({ skip: (page - 1) * count, take: count });
    return {
      pages: Math.ceil(allSchools.length / count),
      schools: schools.map(({ uuid, name, countryCode, city, addressLineOne, addressLineTwo, postalCode }) => ({
        uuid,
        name,
        countryCode,
        city,
        addressLineOne,
        addressLineTwo,
        postalCode,
      })),
    };
  }

  async deleteSchool(deleteSchoolDto: DeleteSchoolDto) {
    return await this.prisma.school.delete({ where: { uuid: deleteSchoolDto.uuid } });
  }
}
