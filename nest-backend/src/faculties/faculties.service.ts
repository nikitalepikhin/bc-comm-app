import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import CreateFacultyDto from "./dto/create-faculty.dto";
import UserDto from "../auth/dto/user.dto";
import GetSchoolsResponseDto from "../schools/dto/get-schools-response.dto";
import GetFacultiesResponseDto from "./dto/get-faculties-response.dto";

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

  async getFaculties(page: number, count: number): Promise<GetFacultiesResponseDto> {
    const allFaculties = await this.prisma.faculty.findMany();
    const faculties = await this.prisma.faculty.findMany({ skip: (page - 1) * count, take: count });
    return {
      pages: Math.ceil(allFaculties.length / count),
      schools: faculties.map(({ uuid, name, countryCode, city, addressLineOne, addressLineTwo, postalCode }) => ({
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
}
