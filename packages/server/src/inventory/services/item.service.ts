import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpsertItemDto } from '../dtos';
import { Item, ItemAttribute } from '../entities';
import { CategoryService } from './category.service';
import { LabelService } from './label.service';

@Injectable()
export class ItemService {
  public constructor(
    @InjectRepository(Item)
    private readonly _itemRepository: Repository<Item>,
    @InjectRepository(ItemAttribute)
    private readonly _attributeRepository: Repository<ItemAttribute>,
    private readonly _categoryService: CategoryService,
    private readonly _labelService: LabelService,
  ) {}

  public async getItems(): Promise<Item[]> {
    return await this._itemRepository.find();
  }

  public async createItem(itemDto: UpsertItemDto): Promise<Item> {
    const { categoryNames, labelNames, ...rest } = itemDto;

    const [categories, labels] = await Promise.all([
      this._categoryService.findOrCreateMany(categoryNames),
      this._labelService.findOrCreateMany(labelNames),
    ]);

    return await this._itemRepository.save({ categories, labels, ...rest });
  }

  public async getAttributes(): Promise<ItemAttribute[]> {
    return await this._attributeRepository.find();
  }
}
