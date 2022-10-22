import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Status, Teacher, User } from "@prisma/client";
import CreateBaseUserDto from "./dto/create-base-user.dto";
import * as bcrypt from "bcrypt";
import * as randomstring from "randomstring";
import CreateRepresentativeUserDto from "./dto/create-representative-user.dto";
import { SchoolsService } from "../schools/schools.service";
import { CreateTeacherUserDto } from "./dto/create-teacher-user.dto";
import { FacultiesService } from "../faculties/faculties.service";
import RefreshUsernameResponseDto from "./dto/refresh-username-response.dto";
import UserDto from "../auth/dto/user.dto";
import VerifyUserRequestDto from "./dto/verify-user-request.dto";
import { isNil } from "@nestjs/common/utils/shared.utils";

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

  async findTeacherByUuid(uuid: string): Promise<Teacher> {
    return await this.prisma.teacher.findUnique({ where: { userUuid: uuid } });
  }

  async verifyUser(user: UserDto, requestDto: VerifyUserRequestDto) {
    if (!requestDto.approve && isNil(requestDto.reason)) {
      return new BadRequestException("Provide a reason for declining verification request.");
    }
    if (requestDto.type === "TEACHER" && (user.role === "ADMIN" || user.role === "REPRESENTATIVE")) {
      const { verified } = await this.prisma.teacher.findUnique({
        where: { userUuid: requestDto.verifiedUserUuid },
        select: { verified: true },
      });
      if (verified) {
        throw new BadRequestException("Teacher is already verified.");
      } else {
        await this.prisma.teacher.update({
          where: { userUuid: requestDto.verifiedUserUuid },
          data: {
            verified: requestDto.approve,
            verificationMessage: requestDto.reason ?? null,
            requestsVerification: false,
            verifiedAt: requestDto.approve ? new Date() : undefined,
            verifiedByUserUuid: requestDto.approve ? user.uuid : undefined,
          },
        });
      }
    } else if (requestDto.type === "REPRESENTATIVE" && user.role === "ADMIN") {
      const { verified } = await this.prisma.representative.findUnique({
        where: { userUuid: requestDto.verifiedUserUuid },
        select: { verified: true },
      });
      if (verified) {
        throw new BadRequestException("Representative is already verified.");
      } else {
        await this.prisma.representative.update({
          where: { userUuid: requestDto.verifiedUserUuid },
          data: {
            verified: requestDto.approve,
            verificationMessage: requestDto.reason ?? null,
            requestsVerification: false,
            verifiedAt: requestDto.approve ? new Date() : undefined,
            verifiedByUserUuid: requestDto.approve ? user.uuid : undefined,
          },
        });
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async getRepresentativeSchoolUuid(userUuid: string): Promise<string> {
    const { schoolUuid } = await this.prisma.representative.findUnique({
      where: { userUuid },
      select: { schoolUuid: true },
    });
    return schoolUuid;
  }
}
