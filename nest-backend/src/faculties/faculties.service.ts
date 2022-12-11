import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import CreateFacultyRequestDto from "./dto/create-faculty-request.dto";
import UserDto from "../auth/dto/user.dto";
import GetFacultiesResponseDto from "./dto/get-faculties-response.dto";
import DeleteFacultyRequestDto from "./dto/delete-faculty-request.dto";
import UpdateFacultyRequestDto from "./dto/update-faculty-request.dto";
import GetFacultyAutocompleteRequestDto from "./dto/get-faculty-autocomplete-request.dto";
import GetFacultyAutocompleteResponseDto from "./dto/get-faculty-autocomplete-response.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class FacultiesService {
  constructor(
    private prisma: PrismaService,

    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async createFaculty(createFacultyDto: CreateFacultyRequestDto, user: UserDto) {
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

  async getFaculties(user: UserDto, page: number, count: number, schoolUuid: string): Promise<GetFacultiesResponseDto> {
    try {
      await this.prisma.school.findUniqueOrThrow({
        where: { uuid: schoolUuid },
      });
      if (user.role === "REPRESENTATIVE") {
        const representative = await this.usersService.findRepresentativeByUuid(user.uuid);
        if (representative.schoolUuid !== schoolUuid) {
          throw new UnauthorizedException();
        }
      }
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
    } catch (e) {
      if (e.code === "P2023" || e.name.toString().toLowerCase().includes("notfounderror")) {
        throw new NotFoundException();
      } else {
        throw e;
      }
    }
  }

  async deleteFaculty(deleteFacultyDto: DeleteFacultyRequestDto) {
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
    try {
      return await this.prisma.faculty.findUniqueOrThrow({ where: { uuid } });
    } catch (e) {
      if (e.name.toString().toLowerCase().includes("notfounderror") || e.code === "P2023") {
        throw new NotFoundException();
      }
    }
  }

  async getFacultyAutocomplete(
    getFacultyAutocomplete: GetFacultyAutocompleteRequestDto,
  ): Promise<GetFacultyAutocompleteResponseDto> {
    return {
      faculties: (
        await this.prisma.faculty.findMany({
          where: {
            name: { contains: getFacultyAutocomplete.value, mode: "insensitive" },
            school: { uuid: getFacultyAutocomplete.schoolUuid },
          },
          take: 10,
        })
      ).map((faculty) => ({ text: faculty.name, value: faculty.uuid })),
    };
  }
}
