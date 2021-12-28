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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRequest } from 'src/identity';
import { UpsertLibraryDto } from '../dtos';
import { Library } from '../entities';
import { LibraryService } from '../services';

@ApiTags('Libraries')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('libraries')
export class LibraryController {
  public constructor(private readonly _libraryService: LibraryService) {}

  @ApiOperation({
    operationId: 'createLibrary',
    summary: 'Create a new library with your user as the owner',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Library })
  @HttpCode(HttpStatus.OK)
  @Post()
  public async createLibrary(
    @Req() request: UserRequest,
    @Body() libraryDto: UpsertLibraryDto,
  ): Promise<Library> {
    return await this._libraryService.createLibrary(
      request.user.id,
      libraryDto,
    );
  }
}
