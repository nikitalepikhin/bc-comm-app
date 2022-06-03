import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RefreshTokensService {
  constructor(private prisma: PrismaService) {}

  async createRefreshTokenForNewFamily(refreshToken: string, family: string): Promise<void> {
    await this.prisma.refreshToken.create({ data: { refreshToken, tokenFamily: family } });
  }
}
