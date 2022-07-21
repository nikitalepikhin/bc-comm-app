import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Status, User } from "@prisma/client";
import CreateBaseUserDto from "./dto/create-base-user.dto";
import * as bcrypt from "bcrypt";
import * as randomstring from "randomstring";
import CreateRepresentativeUserDto from "./dto/create-representative-user.dto";
import { SchoolsService } from "../schools/schools.service";
import GetRepresentativeRequestsDto from "../representatives/dto/get-representative-requests.dto";
import VerifyRepresentativeUserRequestDto from "../representatives/dto/verify-representative-user-request.dto";

const usernameParams = {
  length: 8,
  charset: "alphabetic",
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private schoolService: SchoolsService) {}

  async createBaseUser(userDto: CreateBaseUserDto): Promise<User> {
    const { email, password, role } = userDto;
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException();
    }
    const hashedPassword = await this.hashPassword(password);
    const username = this.generateRandomUsername();
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
    const school = await this.schoolService.getSchoolByUuid(schoolUuid);
    if (!school) {
      throw new InternalServerErrorException("Unknown school provided.");
    }
    const hashedPassword = await this.hashPassword(password);
    const username = this.generateRandomUsername();
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

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private generateRandomUsername(): string {
    return randomstring.generate(usernameParams).toLowerCase();
  }
}
