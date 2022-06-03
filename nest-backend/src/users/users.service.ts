import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Status, User } from "@prisma/client";
import CreateBaseUserDto from "./dto/create-base-user.dto";
import * as bcrypt from "bcrypt";
import * as randomstring from "randomstring";

const usernameParams = {
  length: 8,
  charset: "alphabetic",
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createBaseUser(userDto: CreateBaseUserDto): Promise<User> {
    const { email, password, role } = userDto;
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException();
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const username = randomstring.generate(usernameParams).toLowerCase();
    return this.prisma.user.create({
      data: { email, password: hashedPassword as string, status: Status.ACTIVE, role, username },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getUserUsername(uuid: string) {
    const user = await this.prisma.user.findUnique({ where: { uuid } });
    return user.username;
  }
}
