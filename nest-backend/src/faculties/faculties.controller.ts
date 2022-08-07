import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { Permission, RequirePermissions } from "../auth/permission.enum";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions.guard";
import { FacultiesService } from "./faculties.service";
import CreateFacultyDto from "./dto/create-faculty.dto";
import GetFacultiesResponseDto from "./dto/get-faculties-response.dto";
import GetFacultiesQueryParamsDto from "./dto/get-faculties-query-params.dto";

@Controller("faculties")
export class FacultiesController {
  constructor(private facultiesService: FacultiesService) {}

  @ApiOperation({ summary: "Create a faculty for the specified school." })
  @RequirePermissions(Permission.FACULTY_CREATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Post("/")
  async createFaculty(@Req() request, @Body() createFacultyDto: CreateFacultyDto) {
    await this.facultiesService.createFaculty(createFacultyDto, request.user);
  }

  @ApiOperation({
    summary: "Get a specified number of faculties on a specified page.",
  })
  @ApiParam({ name: "schoolUuid", type: String, required: true })
  @ApiOkResponse({
    description: "Specified number of faculties on a specified page.",
    type: GetFacultiesResponseDto,
    content: {},
  })
  @RequirePermissions(Permission.FACULTY_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/:schoolUuid")
  async getAllFaculties(
    @Query() query: GetFacultiesQueryParamsDto,
    @Param() { schoolUuid },
  ): Promise<GetFacultiesResponseDto> {
    return await this.facultiesService.getFaculties(
      query.page ? parseInt(query.page) : 1,
      query.count ? parseInt(query.count) : 10,
      schoolUuid,
    );
  }
}
