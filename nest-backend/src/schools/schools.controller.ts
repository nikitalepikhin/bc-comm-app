import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import CreateSchoolDto from "./dto/create-school.dto";
import { Permission, RequirePermissions } from "../auth/permission.enum";
import { RequirePermissionsGuard } from "../auth/require-permissions.guard";

@Controller("schools")
export class SchoolsController {
  constructor(private schoolService: SchoolsService) {}

  @ApiOperation({ summary: "Create a school." })
  @RequirePermissions(Permission.SCHOOL_CREATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Post("/")
  async createSchool(@Req() request, @Body() createSchoolDto: CreateSchoolDto) {
    await this.schoolService.createSchool(createSchoolDto, request.user);
  }
}
