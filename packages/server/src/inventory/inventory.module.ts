import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController, ItemController } from './controllers';
import {
  Category,
  Item,
  ItemAttribute,
  ItemAttributeValue,
  LendableItem,
} from './entities';
import { CategoryService, ItemService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Item,
      ItemAttribute,
      ItemAttributeValue,
      LendableItem,
    ]),
  ],
  controllers: [CategoryController, ItemController],
  providers: [CategoryService, ItemService],
  exports: [ItemService],
})
export class InventoryModule {}
