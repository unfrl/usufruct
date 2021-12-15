import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomFieldDto, UpsertItemDto } from '../dtos';
import { Item, ItemAttribute, ItemAttributeValue } from '../entities';
import { CategoryService } from './category.service';
import { LabelService } from './label.service';

@Injectable()
export class ItemService {
  public constructor(
    @InjectRepository(Item)
    private readonly _itemRepository: Repository<Item>,
    @InjectRepository(ItemAttribute)
    private readonly _attributeRepository: Repository<ItemAttribute>,
    @InjectRepository(ItemAttributeValue)
    private readonly _attributeValueRepository: Repository<ItemAttributeValue>,
    private readonly _categoryService: CategoryService,
    private readonly _labelService: LabelService,
  ) {}

  public async getAll(): Promise<Item[]> {
    return await this._itemRepository.find();
  }

  public async getAttributes(): Promise<ItemAttribute[]> {
    return await this._attributeRepository.find();
  }

  public async createItem(itemDto: UpsertItemDto): Promise<Item> {
    const { categoryNames, labelNames, customFields, ...rest } = itemDto;

    const [categories, labels] = await Promise.all([
      this._categoryService.findOrCreateMany(categoryNames),
      this._labelService.findOrCreateMany(labelNames),
    ]);

    const item = await this._itemRepository.save(
      new Item({ categories, labels, ...rest }),
    );

    // TODO: refactor this so its useable in the Promise.all(...)
    await this.processCustomFields(item.id, customFields);

    return item;
  }

  private async processCustomFields(
    itemId: string,
    customFields: CustomFieldDto[],
  ): Promise<void> {
    if (!customFields?.length) {
      return;
    }

    await Promise.all(
      customFields.map((customField) =>
        this.processCustomField(itemId, customField),
      ),
    );
  }

  private async processCustomField(
    itemId: string,
    customField: CustomFieldDto,
  ): Promise<void> {
    const { name, value } = customField;

    const attribute = await this.findOrCreateAttribute(name);

    await this._attributeValueRepository.save(
      new ItemAttributeValue({
        itemId,
        value,
        itemAttributeId: attribute.id,
      }),
    );
  }

  private async findOrCreateAttribute(name: string): Promise<ItemAttribute> {
    const existing = await this._attributeRepository.findOne({
      where: { name },
    });
    if (existing) {
      return existing;
    }

    // TODO: right now, we're letting the datatype default to string
    return await this._attributeRepository.save(
      new ItemAttribute({
        name,
      }),
    );
  }
}
