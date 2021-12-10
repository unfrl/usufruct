import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpsertItemDto } from '../dtos';
import { Item } from '../entities';
import { CategoryService } from './category.service';

@Injectable()
export class ItemService {
  public constructor(
    @InjectRepository(Item)
    private readonly _itemRepository: Repository<Item>,
    private readonly _categoryService: CategoryService,
  ) {}

  public async getItems(): Promise<Item[]> {
    return await this._itemRepository.find();
  }

  public async createItem(itemDto: UpsertItemDto): Promise<Item> {
    const { categoryNames, ...rest } = itemDto;

    const categories = await this._categoryService.findOrCreateMany(
      categoryNames,
    );

    return await this._itemRepository.save({ categories, ...rest });
  }
}
