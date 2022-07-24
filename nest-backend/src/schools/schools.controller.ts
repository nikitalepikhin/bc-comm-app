import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { ApiOkResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import CreateSchoolDto from "./dto/create-school.dto";
import { Permission, RequirePermissions } from "../auth/permission.enum";
import { RequirePermissionsGuard } from "../auth/require-permissions.guard";
import GetSchoolsQueryParamsDto from "./dto/get-schools-query-params.dto";
import { SchoolResponseDto } from "./dto/school-response.dto";
import GetSchoolsResponseDto from "./dto/get-schools-response.dto";

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

  @ApiOperation({
    summary: "Get a specified number of schools on a specified page.",
  })
  @ApiOkResponse({
    description: "Specified number of schools on a specified page.",
    type: GetSchoolsResponseDto,
    content: {},
  })
  @RequirePermissions(Permission.SCHOOL_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/")
  async getSchools(@Query() query: GetSchoolsQueryParamsDto): Promise<GetSchoolsResponseDto> {
    return await this.schoolService.getSchools(
      query.page ? parseInt(query.page) : 1,
      query.count ? parseInt(query.count) : 10,
    );
  }
}
