import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  LibraryGuard,
  LibraryRequest,
  LIBRARY_HEADER_OPTIONS,
} from 'src/library';
import { Label } from '../entities';
import { LabelService } from '../services';

@ApiTags('Labels')
@ApiHeader(LIBRARY_HEADER_OPTIONS)
@UseGuards(LibraryGuard)
@Controller('labels')
export class LabelController {
  public constructor(private readonly _labelService: LabelService) {}

  @ApiOperation({ operationId: 'getLabels', summary: 'Get all labels' })
  @ApiResponse({ status: HttpStatus.OK, type: Label, isArray: true })
  @Get()
  public async getLabels(@Req() request: LibraryRequest): Promise<Label[]> {
    return await this._labelService.getAll(request.library.id);
  }
}
