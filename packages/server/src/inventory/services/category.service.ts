import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities';

@Injectable()
export class CategoryService {
  public constructor(
    @InjectRepository(Category)
    private readonly _categoryRepository: Repository<Category>,
  ) {}

  public async getAll(): Promise<Category[]> {
    return await this._categoryRepository.find();
  }

  public async findOneByName(name: string): Promise<Category | undefined> {
    return await this._categoryRepository.findOne({
      where: { name },
    });
  }

  public async findOrCreate(name: string): Promise<Category> {
    const existing = await this.findOneByName(name);
    if (existing) {
      return existing;
    }

    return await this._categoryRepository.save(new Category({ name }));
  }

  public async findOrCreateMany(names: string[]): Promise<Category[]> {
    return await Promise.all(
      [...new Set(names)].map((name) => this.findOrCreate(name)),
    );
  }
}
