import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Status, User } from "@prisma/client";
import CreateBaseUserDto from "./dto/create-base-user.dto";
import * as bcrypt from "bcrypt";
import * as randomstring from "randomstring";
import CreateRepresentativeUserDto from "./dto/create-representative-user.dto";
import { SchoolsService } from "../schools/schools.service";
import { CreateTeacherUserDto } from "./dto/create-teacher-user.dto";
import { FacultiesService } from "../faculties/faculties.service";
import RefreshUsernameResponseDto from "./dto/refresh-username-response.dto";
import UserDto from "../auth/dto/user.dto";

const usernameParams = {
  length: 8,
  charset: "alphabetic",
};

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private schoolsService: SchoolsService,
    private facultiesService: FacultiesService,
  ) {}

  async createBaseUser(userDto: CreateBaseUserDto): Promise<User> {
    const { email, password, role } = userDto;
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException();
    }
    const hashedPassword = await UsersService.hashPassword(password);
    const username = UsersService.generateRandomUsername();
    return await this.prisma.user.create({
      data: { email, password: hashedPassword, status: Status.ACTIVE, role, username },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findByUuid(uuid: string) {
    return await this.prisma.user.findUnique({ where: { uuid } });
  }

  async createRepresentativeUser(createRepresentativeUserDto: CreateRepresentativeUserDto) {
    const { email, password, role, name, schoolUuid } = createRepresentativeUserDto;
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException();
    }
    const school = await this.schoolsService.getSchoolByUuid(schoolUuid);
    if (!school) {
      throw new InternalServerErrorException("Unknown school provided.");
    }
    const hashedPassword = await UsersService.hashPassword(password);
    const username = UsersService.generateRandomUsername();
    return await this.prisma.representative.create({
      data: {
        user: {
          create: {
            email,
            password: hashedPassword,
            status: Status.ACTIVE,
            role,
            username,
          },
        },
        name,
        school: {
          connect: { uuid: schoolUuid },
        },
      },
    });
  }

  async createTeacherUser(createTeacherUserDto: CreateTeacherUserDto) {
    const { email, password, role, name, schoolUuid, facultyUuid } = createTeacherUserDto;
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException();
    }
    const school = await this.schoolsService.getSchoolByUuid(schoolUuid);
    if (!school) {
      throw new InternalServerErrorException("Unknown school provided.");
    }
    const faculty = await this.facultiesService.getFacultyByUuid(facultyUuid);
    if (!faculty) {
      throw new InternalServerErrorException("Unknown faculty provided.");
    }
    const hashedPassword = await UsersService.hashPassword(password);
    const username = UsersService.generateRandomUsername();
    return await this.prisma.teacher.create({
      data: {
        user: {
          create: {
            email,
            password: hashedPassword,
            status: Status.ACTIVE,
            role,
            username,
          },
        },
        name,
        school: {
          connect: { uuid: schoolUuid },
        },
        faculty: {
          connect: { uuid: facultyUuid },
        },
      },
    });
  }

  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private static generateRandomUsername(): string {
    return randomstring.generate(usernameParams).toLowerCase();
  }

  async refreshUsername(user: UserDto): Promise<RefreshUsernameResponseDto> {
    return await this.prisma.user.update({
      where: { uuid: user.uuid },
      data: { username: UsersService.generateRandomUsername() },
      select: { username: true },
    });
  }
}
