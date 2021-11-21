import { Body, Controller, HttpStatus, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VerificationDto } from './dtos';
import { VerificationService } from './verification.service';

@ApiTags('Verification')
@Controller('verification')
export class VerificationController {
  public constructor(
    private readonly _verificationService: VerificationService,
  ) {}

  @ApiOperation({
    operationId: 'verifyUser',
    summary: 'Verify User',
    description:
      'Verify a User using the token emailed to them during account creation',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  @Put()
  public async verifyUser(
    @Body() verificationDto: VerificationDto,
  ): Promise<void> {
    await this._verificationService.verifyUser(verificationDto);
  }
}
