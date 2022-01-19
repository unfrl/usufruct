import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  LibraryGuard,
  LibraryRequest,
  LIBRARY_HEADER_OPTIONS,
} from 'src/library';
import { Category } from '../entities';
import { CategoryService } from '../services';

@ApiTags('Categories')
@ApiHeader(LIBRARY_HEADER_OPTIONS)
@UseGuards(LibraryGuard)
@Controller('categories')
export class CategoryController {
  public constructor(private readonly _categoryService: CategoryService) {}

  @ApiOperation({ operationId: 'getCategories', summary: 'Get all categories' })
  @ApiResponse({ status: HttpStatus.OK, type: Category, isArray: true })
  @Get()
  public async getCategories(
    @Req() request: LibraryRequest,
  ): Promise<Category[]> {
    return await this._categoryService.getAll(request.library.id);
  }
}
