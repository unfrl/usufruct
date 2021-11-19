import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Item,
  ItemAttribute,
  ItemAttributeValue,
  LendableItem,
} from './entities';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Item,
      ItemAttribute,
      ItemAttributeValue,
      LendableItem,
    ]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
