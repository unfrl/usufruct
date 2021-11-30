import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ItemService } from '../services';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  public constructor(private readonly _itemService: ItemService) {}

  @ApiOperation({
    operationId: 'getItems',
    summary: 'Get items',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getItems() {
    return await this._itemService.getItems();
  }
}
