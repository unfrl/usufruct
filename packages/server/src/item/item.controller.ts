import { Controller, Get } from '@nestjs/common';

import { ItemService } from './item.service';

@Controller('api/items')
export class ItemController {
  constructor(private readonly _itemService: ItemService) {}

  @Get()
  public async getItems() {
    return await this._itemService.getItems();
  }
}
