import {
  Body,
  Controller,
  Get,
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
import { Library, LibraryMember } from '../entities';
import { LibraryMemberService, LibraryService } from '../services';

@ApiTags('Libraries')
@Controller('libraries')
export class LibraryController {
  public constructor(
    private readonly _libraryService: LibraryService,
    private readonly _libraryMemberService: LibraryMemberService,
  ) {}

  @ApiOperation({
    operationId: 'getLibraries',
    summary: 'Get list of libraries',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Library, isArray: true })
  @Get()
  public async getLibraries(): Promise<Library[]> {
    return await this._libraryService.getAll();
  }

  @ApiOperation({
    operationId: 'createLibrary',
    summary: 'Create a new library with your user as the owner',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Library })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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

  @ApiOperation({
    operationId: 'getUserMemberships',
    summary:
      'Based off bearer token, get associated libraries that the associated user is a member of',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Library, isArray: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('me')
  public async getUserMemberships(
    @Req() request: UserRequest,
  ): Promise<LibraryMember[]> {
    return await this._libraryMemberService.findByUserId(request.user.id);
  }
}
