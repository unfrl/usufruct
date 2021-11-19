import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Item,
  ItemAttribute,
  ItemAttributeValue,
  LendableItem,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Item,
      ItemAttribute,
      ItemAttributeValue,
      LendableItem,
    ]),
  ],
})
export class ItemsModule {}
