import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RefreshToken } from "@prisma/client";

@Injectable()
export class RefreshTokensService {
  constructor(private prisma: PrismaService) {}

  async createRefreshTokenForNewFamily(refreshToken: string, family: string): Promise<void> {
    await this.prisma.refreshToken.create({ data: { refreshToken, tokenFamily: family } });
  }

  async getRefreshToken(refreshToken: string) {
    return await this.prisma.refreshToken.findUnique({ where: { refreshToken } });
  }

  async setRefreshTokenToUsed(refreshToken: RefreshToken) {
    await this.prisma.refreshToken.update({ data: { used: true }, where: { uuid: refreshToken.uuid } });
  }

  async invalidateRefreshTokenFamily(refreshToken: RefreshToken) {
    await this.prisma.refreshToken.deleteMany({ where: { tokenFamily: refreshToken.tokenFamily } });
  }
}
