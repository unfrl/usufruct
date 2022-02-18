import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRequest } from 'src/identity';
import { UpsertAttachmentDto } from '../dtos';
import { AttachmentService } from '../services';

@ApiTags('attachments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('attachments')
export class AttachmentController {
  public constructor(private readonly _attachmentService: AttachmentService) {}

  @ApiOperation({
    operationId: 'createAttachment',
    summary:
      'Create a new attachment. Response payload will include upload URL.',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  public async createAttachment(
    @Req() request: UserRequest,
    @Body() attachmentDto: UpsertAttachmentDto,
  ) {
    return await this._attachmentService.createAttachment(
      attachmentDto,
      request.user.id,
    );
  }
}