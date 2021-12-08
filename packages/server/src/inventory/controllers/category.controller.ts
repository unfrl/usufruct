import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from '../entities';
import { CategoryService } from '../services';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  public constructor(private readonly _categoryService: CategoryService) {}

  @ApiOperation({ operationId: 'getCategories', summary: 'Get all categories' })
  @ApiResponse({ status: HttpStatus.OK, type: Category, isArray: true })
  @Get()
  public async getCategories(): Promise<Category[]> {
    return await this._categoryService.getAll();
  }
}
