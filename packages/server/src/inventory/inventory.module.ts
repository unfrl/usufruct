import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './controllers';
import {
  Item,
  ItemAttribute,
  ItemAttributeValue,
  LendableItem,
} from './entities';
import { ItemService } from './services';

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
export class InventoryModule {}
