import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import CreateFacultyDto from "./dto/create-faculty.dto";
import UserDto from "../auth/dto/user.dto";
import GetFacultiesResponseDto from "./dto/get-faculties-response.dto";
import DeleteFacultyDto from "./dto/delete-faculty.dto";
import UpdateFacultyRequestDto from "./dto/update-faculty-request.dto";

@Injectable()
export class FacultiesService {
  constructor(private prisma: PrismaService) {}

  async createFaculty(createFacultyDto: CreateFacultyDto, user: UserDto) {
    return await this.prisma.faculty.create({
      data: {
        schoolUuid: createFacultyDto.schoolUuid,
        name: createFacultyDto.name,
        countryCode: createFacultyDto.countryCode,
        city: createFacultyDto.city,
        addressLineOne: createFacultyDto.addressLineOne,
        addressLineTwo: createFacultyDto.addressLineTwo,
        postalCode: createFacultyDto.postalCode,
        createdByUuid: user.uuid,
        modifiedByUuid: user.uuid,
      },
    });
  }

  async getFaculties(page: number, count: number, schoolUuid: string): Promise<GetFacultiesResponseDto> {
    const allFaculties = await this.prisma.faculty.findMany({ where: { schoolUuid } });
    const faculties = await this.prisma.faculty.findMany({
      where: { schoolUuid },
      skip: (page - 1) * count,
      take: count,
    });
    return {
      pages: Math.ceil(allFaculties.length / count),
      faculties: faculties.map(({ uuid, name, countryCode, city, addressLineOne, addressLineTwo, postalCode }) => ({
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

  async deleteFaculty(deleteFacultyDto: DeleteFacultyDto) {
    console.log(`about to delete a faculty with uuid ${deleteFacultyDto.uuid}`);
    return await this.prisma.faculty.delete({ where: { uuid: deleteFacultyDto.uuid } });
  }

  async updateFaculty(updateFacultyRequestDto: UpdateFacultyRequestDto) {
    return this.prisma.faculty.update({
      where: { uuid: updateFacultyRequestDto.uuid },
      data: {
        name: updateFacultyRequestDto.name,
        countryCode: updateFacultyRequestDto.countryCode,
        city: updateFacultyRequestDto.city,
        addressLineOne: updateFacultyRequestDto.addressLineOne,
        addressLineTwo: updateFacultyRequestDto.addressLineTwo,
        postalCode: updateFacultyRequestDto.postalCode,
      },
    });
  }

  async getFacultyByUuid(uuid: string) {
    return await this.prisma.faculty.findUnique({ where: { uuid } });
  }
}
