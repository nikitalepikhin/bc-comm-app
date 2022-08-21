import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Permission, RequirePermissions } from "../auth/permission.enum";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions.guard";
import { RepresentativesService } from "./representatives.service";
import VerifyRepresentativeUserRequestDto from "./dto/verify-representative-user-request.dto";
import GetRepresentativeRequestsDto from "./dto/get-representative-requests.dto";

@Controller("representatives")
export class RepresentativesController {
  constructor(private representativesService: RepresentativesService) {}

  @ApiOperation({ summary: "Request verification." })
  @RequirePermissions(Permission.REP_REQ_VERIFY)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/request")
  async requestRepresentativeVerification(@Req() request) {
    await this.representativesService.requestVerification(request.user);
  }

  @ApiOperation({ summary: "Get representative verification requests." })
  @ApiOkResponse({
    description: "Representative verification requests.",
    type: GetRepresentativeRequestsDto,
    content: {},
  })
  @RequirePermissions(Permission.REP_REQ_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/verify")
  async getRepresentativeVerificationRequests(): Promise<GetRepresentativeRequestsDto> {
    return await this.representativesService.getRepresentativeVerificationRequests();
  }

  @ApiOperation({ summary: "Verify representative or decline verification request." })
  @RequirePermissions(Permission.REP_REQ_UPDATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Post("/verify")
  async verifyRepresentativeUser(
    @Req() request,
    @Body() verifyRepresentativeUserRequest: VerifyRepresentativeUserRequestDto,
  ) {
    await this.representativesService.verifyRepresentativeUser(request.user, verifyRepresentativeUserRequest);
  }
}
