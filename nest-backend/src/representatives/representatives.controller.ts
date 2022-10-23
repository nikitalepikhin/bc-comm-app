import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Permission, RequirePermissions } from "../auth/permission.enum";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions.guard";
import { RepresentativesService } from "./representatives.service";
import GetRepresentativeRequestsDto from "./dto/get-representative-requests.dto";

@Controller("representatives")
export class RepresentativesController {
  constructor(private representativesService: RepresentativesService) {}

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
    return await this.representativesService.getVerificationRequests();
  }
}
