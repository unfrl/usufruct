import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryModule } from 'src/library';
import {
  CategoryController,
  ItemController,
  LabelController,
} from './controllers';
import {
  Category,
  Item,
  ItemAttribute,
  ItemAttributeValue,
  Label,
  LendableItem,
} from './entities';
import { CategoryService, ItemService, LabelService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Item,
      ItemAttribute,
      ItemAttributeValue,
      Label,
      LendableItem,
    ]),
    LibraryModule,
  ],
  controllers: [CategoryController, ItemController, LabelController],
  providers: [CategoryService, ItemService, LabelService],
  exports: [ItemService],
})
export class InventoryModule {}
