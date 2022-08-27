import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import CreateSchoolDto from "./dto/create-school.dto";
import { Permission, RequirePermissions } from "../auth/permission.enum";
import { RequirePermissionsGuard } from "../auth/require-permissions.guard";
import GetSchoolsQueryParamsDto from "./dto/get-schools-query-params.dto";
import SchoolResponseDto from "./dto/school-response.dto";
import GetSchoolsResponseDto from "./dto/get-schools-response.dto";
import GetSchoolByUuidRequestDto from "./dto/get-school-by-uuid-request.dto";
import UpdateSchoolRequestDto from "./dto/update-school-request.dto";
import DeleteSchoolDto from "./dto/delete-school.dto";
import GetSchoolAutocompleteRequestDto from "./dto/get-school-autocomplete-request.dto";
import GetSchoolAutocompleteResponseDto from "./dto/get-school-autocomplete-response.dto";

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
  async getAllSchools(@Query() query: GetSchoolsQueryParamsDto): Promise<GetSchoolsResponseDto> {
    return await this.schoolService.getSchools(
      query.page ? parseInt(query.page) : 1,
      query.count ? parseInt(query.count) : 10,
    );
  }

  @ApiOperation({
    summary: "Get a school by UUID.",
  })
  @ApiOkResponse({
    description: "School by UUID.",
    type: SchoolResponseDto,
    content: {},
  })
  @RequirePermissions(Permission.SCHOOL_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/:uuid")
  async getSchoolByUuid(@Param() param: GetSchoolByUuidRequestDto): Promise<SchoolResponseDto> {
    return await this.schoolService.getSchoolByUuid(param.uuid);
  }

  @ApiOperation({
    summary: "Get school autocomplete value.",
  })
  @ApiOkResponse({
    description: "School autocomplete values.",
    type: GetSchoolAutocompleteResponseDto,
    content: {},
  })
  @Post("/ac")
  async getSchoolAutocomplete(
    @Body() getSchoolAutocomplete: GetSchoolAutocompleteRequestDto,
  ): Promise<GetSchoolAutocompleteResponseDto> {
    if (getSchoolAutocomplete.value.length > 0) {
      return await this.schoolService.getSchoolAutocomplete(getSchoolAutocomplete);
    } else {
      return { schools: [] };
    }
  }

  @ApiOperation({
    summary: "Update a school based on the provided UUID.",
  })
  @RequirePermissions(Permission.SCHOOL_UPDATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Put("/")
  async updateSchool(@Body() updateSchoolRequestDto: UpdateSchoolRequestDto) {
    return await this.schoolService.updateSchool(updateSchoolRequestDto);
  }

  @ApiOperation({
    summary: "Delete a school based on the provided UUID.",
  })
  @RequirePermissions(Permission.SCHOOL_DELETE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Delete("/")
  async deleteSchool(@Body() deleteSchoolDto: DeleteSchoolDto) {
    return await this.schoolService.deleteSchool(deleteSchoolDto);
  }
}
