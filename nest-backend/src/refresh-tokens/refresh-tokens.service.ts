import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RefreshTokensService {
  constructor(private prisma: PrismaService) {}

  async createRefreshToken(refreshToken: string, family: string): Promise<void> {
    await this.prisma.refreshToken.upsert({
      where: { refreshToken },
      update: {},
      create: { refreshToken, tokenFamily: family },
    });
  }

  async getRefreshTokenByValue(refreshToken: string) {
    return await this.prisma.refreshToken.findUnique({ where: { refreshToken } });
  }

  async setRefreshTokenToUsedByValue(refreshToken: string) {
    return await this.prisma.refreshToken.update({ data: { used: true }, where: { refreshToken } });
  }

  async invalidateRefreshTokenFamilyByFamily(tokenFamily: string) {
    await this.prisma.refreshToken.deleteMany({ where: { tokenFamily } });
  }
}
