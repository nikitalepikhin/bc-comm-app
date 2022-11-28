import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Permission, RequirePermissions } from "../auth/require-permissions/permission.enum";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions/require-permissions.guard";
import { FacultiesService } from "./faculties.service";
import CreateFacultyRequestDto from "./dto/create-faculty-request.dto";
import GetFacultiesResponseDto from "./dto/get-faculties-response.dto";
import GetFacultiesQueryDto from "./dto/get-faculties-query.dto";
import DeleteFacultyRequestDto from "./dto/delete-faculty-request.dto";
import UpdateFacultyRequestDto from "./dto/update-faculty-request.dto";
import FacultyResponseDto from "./dto/faculty-response.dto";
import GetFacultyByUuidParamDto from "./dto/get-faculty-by-uuid-param.dto";
import GetFacultyAutocompleteRequestDto from "./dto/get-faculty-autocomplete-request.dto";
import GetFacultyAutocompleteResponseDto from "./dto/get-faculty-autocomplete-response.dto";
import { IsVerifiedGuard } from "../auth/verification/is-verified.guard";
import GetFacultiesParamDto from "./dto/get-faculties-param.dto";
import UserDto from "../auth/dto/user.dto";

@Controller("faculties")
export class FacultiesController {
  constructor(private facultiesService: FacultiesService) {}

  @ApiOperation({ summary: "Create a faculty for the specified school." })
  @RequirePermissions(Permission.FACULTY_CREATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Post("/")
  async createFaculty(@Req() request, @Body() requestDto: CreateFacultyRequestDto) {
    await this.facultiesService.createFaculty(requestDto, request.user);
  }

  @ApiOperation({
    summary: "Get a specified number of faculties on a specified page.",
  })
  @ApiOkResponse({
    description: "Specified number of faculties on a specified page.",
    type: GetFacultiesResponseDto,
    content: {},
  })
  @RequirePermissions(Permission.FACULTY_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/:uuid")
  async getAllFaculties(
    @Req() request,
    @Query() query: GetFacultiesQueryDto,
    @Param() params: GetFacultiesParamDto,
  ): Promise<GetFacultiesResponseDto> {
    return await this.facultiesService.getFaculties(
      request.user as UserDto,
      query.page ?? 1,
      query.count ?? 10,
      params.uuid,
    );
  }

  @ApiOperation({
    summary: "Get a faculty by UUID.",
  })
  @ApiOkResponse({
    description: "Faculty by UUID.",
    type: FacultyResponseDto,
    content: {},
  })
  @RequirePermissions(Permission.FACULTY_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/faculty/:uuid")
  async getFacultyByUuid(@Param() params: GetFacultyByUuidParamDto): Promise<FacultyResponseDto> {
    return await this.facultiesService.getFacultyByUuid(params.uuid);
  }

  @ApiOperation({
    summary: "Get faculty autocomplete value.",
  })
  @ApiOkResponse({
    description: "Faculty autocomplete values.",
    type: GetFacultyAutocompleteResponseDto,
    content: {},
  })
  @Post("/ac")
  async getFacultyAutocomplete(
    @Body() requestDto: GetFacultyAutocompleteRequestDto,
  ): Promise<GetFacultyAutocompleteResponseDto> {
    if (requestDto.value.length > 0) {
      return await this.facultiesService.getFacultyAutocomplete(requestDto);
    } else {
      return { faculties: [] };
    }
  }

  @ApiOperation({
    summary: "Update a faculty based on the provided UUID.",
  })
  @RequirePermissions(Permission.FACULTY_UPDATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Put("/")
  async updateFaculty(@Body() requestDto: UpdateFacultyRequestDto) {
    return await this.facultiesService.updateFaculty(requestDto);
  }

  @ApiOperation({
    summary: "Delete a faculty based on the provided UUID.",
  })
  @RequirePermissions(Permission.FACULTY_DELETE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Delete("/")
  async deleteFaculty(@Body() requestDto: DeleteFacultyRequestDto) {
    return await this.facultiesService.deleteFaculty(requestDto);
  }
}
