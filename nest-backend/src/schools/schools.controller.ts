import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import CreateSchoolRequestDto from "./dto/create-school-request.dto";
import { Permission, RequirePermissions } from "../auth/require-permissions/permission.enum";
import { RequirePermissionsGuard } from "../auth/require-permissions/require-permissions.guard";
import GetSchoolsQueryDto from "./dto/get-schools-query.dto";
import SchoolResponseDto from "./dto/school-response.dto";
import GetSchoolsResponseDto from "./dto/get-schools-response.dto";
import GetSchoolByUuidParamDto from "./dto/get-school-by-uuid-param.dto";
import UpdateSchoolRequestDto from "./dto/update-school-request.dto";
import DeleteSchoolRequestDto from "./dto/delete-school-request.dto";
import GetSchoolAutocompleteRequestDto from "./dto/get-school-autocomplete-request.dto";
import GetSchoolAutocompleteResponseDto from "./dto/get-school-autocomplete-response.dto";
import { IsVerifiedGuard } from "../auth/verification/is-verified.guard";

@Controller("schools")
export class SchoolsController {
  constructor(private schoolService: SchoolsService) {}

  @ApiOperation({ summary: "Create a school." })
  @RequirePermissions(Permission.SCHOOL_CREATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Post("/")
  async createSchool(@Req() request, @Body() requestDto: CreateSchoolRequestDto) {
    await this.schoolService.createSchool(requestDto, request.user);
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
  async getAllSchools(@Query() query: GetSchoolsQueryDto): Promise<GetSchoolsResponseDto> {
    return await this.schoolService.getSchools(query.page ?? 1, query.count ?? 10);
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
  async getSchoolByUuid(@Param() params: GetSchoolByUuidParamDto): Promise<SchoolResponseDto> {
    return await this.schoolService.getSchoolByUuid(params.uuid);
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
    @Body() requestDto: GetSchoolAutocompleteRequestDto,
  ): Promise<GetSchoolAutocompleteResponseDto> {
    if (requestDto.value.length > 0) {
      return await this.schoolService.getSchoolAutocomplete(requestDto);
    } else {
      return { schools: [] };
    }
  }

  @ApiOperation({
    summary: "Update a school based on the provided UUID.",
  })
  @RequirePermissions(Permission.SCHOOL_UPDATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Put("/")
  async updateSchool(@Body() requestDto: UpdateSchoolRequestDto) {
    return await this.schoolService.updateSchool(requestDto);
  }

  @ApiOperation({
    summary: "Delete a school based on the provided UUID.",
  })
  @RequirePermissions(Permission.SCHOOL_DELETE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Delete("/")
  async deleteSchool(@Body() requestDto: DeleteSchoolRequestDto) {
    return await this.schoolService.deleteSchool(requestDto);
  }
}
