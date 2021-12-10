import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Label } from '../entities';
import { LabelService } from '../services';

@ApiTags('Labels')
@Controller('labels')
export class LabelController {
  public constructor(private readonly _labelService: LabelService) {}

  @ApiOperation({ operationId: 'getLabels', summary: 'Get all labels' })
  @ApiResponse({ status: HttpStatus.OK, type: Label, isArray: true })
  @Get()
  public async getLabels(): Promise<Label[]> {
    return await this._labelService.getAll();
  }
}
