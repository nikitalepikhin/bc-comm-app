import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { Permission, RequirePermissions } from "../auth/require-permissions/permission.enum";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions/require-permissions.guard";
import { FacultiesService } from "./faculties.service";
import CreateFacultyRequestDto from "./dto/create-faculty-request.dto";
import GetFacultiesResponseDto from "./dto/get-faculties-response.dto";
import GetFacultiesQueryDto from "./dto/get-faculties-query.dto";
import DeleteFacultyDto from "./dto/delete-faculty.dto";
import UpdateFacultyRequestDto from "./dto/update-faculty-request.dto";
import FacultyResponseDto from "./dto/faculty-response.dto";
import GetFacultyByUuidRequestDto from "./dto/get-faculty-by-uuid-request.dto";
import GetFacultyAutocompleteRequestDto from "./dto/get-faculty-autocomplete-request.dto";
import GetFacultyAutocompleteResponseDto from "./dto/get-faculty-autocomplete-response.dto";
import { IsVerifiedGuard } from "src/auth/verification/is-verified.guard";

@Controller("faculties")
export class FacultiesController {
  constructor(private facultiesService: FacultiesService) {}

  @ApiOperation({ summary: "Create a faculty for the specified school." })
  @RequirePermissions(Permission.FACULTY_CREATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Post("/")
  async createFaculty(@Req() request, @Body() createFacultyDto: CreateFacultyRequestDto) {
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
    @Query() query: GetFacultiesQueryDto,
    @Param() { schoolUuid },
  ): Promise<GetFacultiesResponseDto> {
    return await this.facultiesService.getFaculties(query.page ?? 1, query.count ?? 10, schoolUuid);
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
  async getFacultyByUuid(@Param() param: GetFacultyByUuidRequestDto): Promise<FacultyResponseDto> {
    return await this.facultiesService.getFacultyByUuid(param.uuid);
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
    @Body() getFacultyAutocomplete: GetFacultyAutocompleteRequestDto,
  ): Promise<GetFacultyAutocompleteResponseDto> {
    if (getFacultyAutocomplete.value.length > 0) {
      return await this.facultiesService.getFacultyAutocomplete(getFacultyAutocomplete);
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
  async updateFaculty(@Body() updateFacultyRequestDto: UpdateFacultyRequestDto) {
    return await this.facultiesService.updateFaculty(updateFacultyRequestDto);
  }

  @ApiOperation({
    summary: "Delete a faculty based on the provided UUID.",
  })
  @RequirePermissions(Permission.FACULTY_DELETE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @Delete("/")
  async deleteFaculty(@Body() deleteFacultyDto: DeleteFacultyDto) {
    return await this.facultiesService.deleteFaculty(deleteFacultyDto);
  }
}
