import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Representative, Status, Teacher, User } from "@prisma/client";
import CreateBaseUserRequestDto, { BaseRole } from "../auth/dto/create-base-user-request.dto";
import * as bcrypt from "bcrypt";
import * as randomstring from "randomstring";
import CreateRepresentativeUserRequestDto from "../auth/dto/create-representative-user-request.dto";
import { SchoolsService } from "../schools/schools.service";
import { CreateTeacherUserRequestDto } from "../auth/dto/create-teacher-user-request.dto";
import { FacultiesService } from "../faculties/faculties.service";
import RefreshUsernameResponseDto from "./dto/refresh-username-response.dto";
import UserDto from "../auth/dto/user.dto";
import VerifyUserRequestDto from "./dto/verify-user-request.dto";
import { isNil } from "@nestjs/common/utils/shared.utils";
import GetUserProfileResponseDto from "./dto/get-user-profile-response.dto";
import UpdateUserProfileRequestDto from "./dto/update-user-profile-request.dto";
import { ChannelsService } from "../channels/channels.service";
import { PostsService } from "../posts/posts.service";
import { CommentsService } from "../comments/comments.service";

const usernameParams = {
  length: process.env.USERNAME_LENGTH ?? 8,
  charset: "alphabetic",
};

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private schoolsService: SchoolsService,

    @Inject(forwardRef(() => FacultiesService))
    private facultiesService: FacultiesService,

    @Inject(forwardRef(() => ChannelsService))
    private channelsService: ChannelsService,

    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,

    @Inject(forwardRef(() => CommentsService))
    private commentsService: CommentsService,
  ) {}

  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private static generateRandomUsername(): string {
    return randomstring.generate(usernameParams).toLowerCase();
  }

  async createBaseUser(userDto: CreateBaseUserRequestDto, role: BaseRole): Promise<User> {
    const { email, password } = userDto;
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException();
    }
    const hashedPassword = await UsersService.hashPassword(password);
    const username = UsersService.generateRandomUsername();
    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        status: Status.ACTIVE,
        role,
        username,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findByUuid(uuid: string) {
    return await this.prisma.user.findUnique({ where: { uuid } });
  }

  async createRepresentativeUser(createRepresentativeUserDto: CreateRepresentativeUserRequestDto) {
    const { email, password, name, schoolUuid } = createRepresentativeUserDto;
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
            role: "REPRESENTATIVE",
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

  async createTeacherUser(createTeacherUserDto: CreateTeacherUserRequestDto) {
    const { email, password, name, schoolUuid, facultyUuid } = createTeacherUserDto;
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
            role: "TEACHER",
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

  async findRepresentativeByUuid(uuid: string): Promise<Representative> {
    return await this.prisma.representative.findUnique({ where: { userUuid: uuid } });
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
        throw new BadRequestException("this teacher is already verified");
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
        throw new BadRequestException("this representative is already verified");
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

  async getRepresentativeByUuid(userUuid: string): Promise<Representative> {
    return await this.prisma.representative.findUnique({
      where: { userUuid },
    });
  }

  async getTeacherByUuid(userUuid: string): Promise<Teacher> {
    return await this.prisma.teacher.findUnique({ where: { userUuid } });
  }

  async requestVerification(user: UserDto) {
    if (user.role === "REPRESENTATIVE") {
      await this.prisma.representative.update({ where: { userUuid: user.uuid }, data: { requestsVerification: true } });
    } else if (user.role === "TEACHER") {
      await this.prisma.teacher.update({ where: { userUuid: user.uuid }, data: { requestsVerification: true } });
    }
  }

  async getUserProfile(user: UserDto): Promise<GetUserProfileResponseDto> {
    if (user.role === "ADMIN" || user.role === "STUDENT") {
      return {
        name: undefined,
        bio: undefined,
      };
    } else if (user.role === "TEACHER") {
      const { name, bio } = await this.prisma.teacher.findUnique({
        where: { userUuid: user.uuid },
        select: { name: true, bio: true },
      });
      return { name: name ?? undefined, bio: bio ?? undefined };
    } else if (user.role === "REPRESENTATIVE") {
      const { name } = await this.prisma.representative.findUnique({
        where: { userUuid: user.uuid },
        select: { name: true },
      });
      return { name: name ?? undefined, bio: undefined };
    }
  }

  async updateUserProfile(user: UserDto, requestDto: UpdateUserProfileRequestDto) {
    if (user.role === "TEACHER") {
      await this.prisma.teacher.update({
        where: { userUuid: user.uuid },
        data: {
          name: requestDto.name,
          bio: requestDto.bio,
          nameModified: new Date(),
          bioModified: new Date(),
        },
      });
    } else if (user.role === "REPRESENTATIVE") {
      await this.prisma.representative.update({
        where: { userUuid: user.uuid },
        data: {
          name: requestDto.name,
        },
      });
    }
  }

  async updateUserEmail(userUuid: string, email: string) {
    await this.prisma.user.update({ where: { uuid: userUuid }, data: { email } });
  }

  async updateUserPassword(uuid: string, password: string) {
    const hashedPassword = await UsersService.hashPassword(password);
    await this.prisma.user.update({
      where: { uuid },
      data: {
        password: hashedPassword,
        passwordModified: new Date(),
      },
    });
  }

  async deleteAccount(uuid: string) {
    await this.prisma.$transaction(async (tx) => {
      // 1. delete all user created channels
      await tx.channel.deleteMany({ where: { createdByUuid: uuid } });
      // 2. mark all user's posts with username deleted
      await tx.post.updateMany({ where: { authorUuid: uuid }, data: { authorUsername: "deleted" } });
      // 3. mark all user's comments with username deleted
      await tx.comment.updateMany({ where: { authorUuid: uuid }, data: { authorUsername: "deleted" } });
      // 4. finally delete the account
      await tx.user.delete({ where: { uuid } });
    });
  }

  async checkUserVerification(user: UserDto): Promise<boolean> {
    if (user.role === "REPRESENTATIVE") {
      const { verified } = await this.prisma.representative.findUnique({
        where: { userUuid: user.uuid },
        select: { verified: true },
      });
      return verified;
    } else if (user.role === "TEACHER") {
      const { verified } = await this.prisma.teacher.findUnique({
        where: { userUuid: user.uuid },
        select: { verified: true },
      });
      return verified;
    } else {
      return true;
    }
  }
}
