import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("test")
@Controller("test")
export class TestController {
  @ApiOperation({ summary: "Hello, world!" })
  @UseGuards(JwtAuthGuard)
  @Get("/hello")
  async hello(@Req() request) {
    return { message: "Hello, world!", ...request.user, ...request.cookies };
  }
}
