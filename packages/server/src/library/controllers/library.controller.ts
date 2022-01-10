import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
    operationId: 'getUserMemberships',
    summary: 'Get the memberships and libraries for your user',
  })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryMember, isArray: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('me')
  public async getUserMemberships(
    @Req() request: UserRequest,
  ): Promise<LibraryMember[]> {
    return await this._libraryMemberService.findByUserId(request.user.id);
  }

  @ApiOperation({
    operationId: 'getLibrary',
    summary: 'Get a library by its slug',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Library })
  @Get(':slug')
  public async getLibrary(@Param('slug') slug: string): Promise<Library> {
    return await this._libraryService.findOneBySlug(slug);
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
}
