import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entities';

@Injectable()
export class ItemService {
  public constructor(
    @InjectRepository(Item)
    private readonly _itemRepository: Repository<Item>,
  ) {}

  public async getItems(): Promise<Item[]> {
    return await this._itemRepository.find();
  }
}
