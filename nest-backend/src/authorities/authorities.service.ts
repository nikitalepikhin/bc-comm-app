import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthoritiesService {
  constructor(private prismaService: PrismaService) {}

  async getAuthorityByName(name: string) {
    return await this.prismaService.authority.findUnique({ where: { name: name } });
  }
}
