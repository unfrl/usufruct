import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  public constructor(private readonly _itemService: ItemService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getItems() {
    return await this._itemService.getItems();
  }
}
