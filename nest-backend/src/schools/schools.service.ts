import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import CreateSchoolDto from "./dto/create-school.dto";
import ValidateUserDto from "../users/dto/validate-user.dto";
import GetSchoolsResponseDto from "./dto/get-schools-response.dto";
import UpdateSchoolRequestDto from "./dto/update-school-request.dto";
import DeleteSchoolDto from "./dto/delete-school.dto";

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  async createSchool(schoolDto: CreateSchoolDto, userDto: ValidateUserDto) {
    return await this.prisma.school.create({
      data: { ...schoolDto, createdByUuid: userDto.uuid, modifiedByUuid: userDto.uuid },
    });
  }

  async getSchoolByUuid(uuid: string) {
    return await this.prisma.school.findUnique({ where: { uuid } });
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

  async updateSchool(updateSchoolRequestDto: UpdateSchoolRequestDto) {
    return await this.prisma.school.update({
      where: { uuid: updateSchoolRequestDto.uuid },
      data: {
        name: updateSchoolRequestDto.name,
        countryCode: updateSchoolRequestDto.countryCode,
        city: updateSchoolRequestDto.city,
        addressLineOne: updateSchoolRequestDto.addressLineOne,
        addressLineTwo: updateSchoolRequestDto.addressLineTwo,
        postalCode: updateSchoolRequestDto.postalCode,
      },
    });
  }
}
