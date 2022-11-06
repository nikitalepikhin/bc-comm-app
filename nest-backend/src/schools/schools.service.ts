import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import CreateSchoolRequestDto from "./dto/create-school-request.dto";
import GetSchoolsResponseDto from "./dto/get-schools-response.dto";
import UpdateSchoolRequestDto from "./dto/update-school-request.dto";
import DeleteSchoolRequestDto from "./dto/delete-school-request.dto";
import GetSchoolAutocompleteRequestDto from "./dto/get-school-autocomplete-request.dto";
import GetSchoolAutocompleteResponseDto from "./dto/get-school-autocomplete-response.dto";
import UserDto from "../auth/dto/user.dto";

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  async createSchool(schoolDto: CreateSchoolRequestDto, userDto: UserDto) {
    return await this.prisma.school.create({
      data: { ...schoolDto, createdByUuid: userDto.uuid, modifiedByUuid: userDto.uuid },
    });
  }

  async getSchoolByUuid(uuid: string) {
    return await this.prisma.school.findUnique({ where: { uuid } });
  }

  async getSchools(page: number, count: number): Promise<GetSchoolsResponseDto> {
    const schoolCount = await this.prisma.school.count();
    const schools = await this.prisma.school.findMany({ skip: (page - 1) * count, take: count });
    return {
      pages: Math.ceil(schoolCount / count),
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

  async deleteSchool(deleteSchoolDto: DeleteSchoolRequestDto) {
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

  async getSchoolAutocomplete(
    getSchoolAutocomplete: GetSchoolAutocompleteRequestDto,
  ): Promise<GetSchoolAutocompleteResponseDto> {
    return {
      schools: (
        await this.prisma.school.findMany({
          where: { name: { contains: getSchoolAutocomplete.value, mode: "insensitive" } },
          take: 10,
        })
      ).map((school) => ({ text: school.name, value: school.uuid })),
    };
  }
}
