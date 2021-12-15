import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpsertItemDto } from '../dtos';
import { Item, ItemAttribute } from '../entities';
import { ItemService } from '../services';

@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('items')
export class ItemController {
  public constructor(private readonly _itemService: ItemService) {}

  @ApiOperation({
    operationId: 'getItems',
    summary: 'Get items',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Item, isArray: true })
  @Get()
  public async getItems(): Promise<Item[]> {
    return await this._itemService.getAll();
  }

  @ApiOperation({
    operationId: 'createItem',
    summary: 'Create a new item definition',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Item })
  @HttpCode(HttpStatus.OK)
  @Post()
  public async createItem(@Body() itemDto: UpsertItemDto): Promise<Item> {
    return await this._itemService.createItem(itemDto);
  }

  @ApiOperation({
    operationId: 'getItemAttributes',
    summary: 'Get item attributes',
  })
  @ApiResponse({ status: HttpStatus.OK, type: ItemAttribute, isArray: true })
  @Get('attributes')
  public async getItemAttributes(): Promise<ItemAttribute[]> {
    return await this._itemService.getAttributes();
  }
}
