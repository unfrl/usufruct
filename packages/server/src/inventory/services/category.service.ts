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

  public async getAll(libraryId: string): Promise<Category[]> {
    return await this._categoryRepository.find({ where: { libraryId } });
  }

  public async findOneByName(
    name: string,
    libraryId: string,
  ): Promise<Category | undefined> {
    return await this._categoryRepository.findOne({
      where: { name, libraryId },
    });
  }

  public async findOrCreate(
    name: string,
    libraryId: string,
  ): Promise<Category> {
    const existing = await this.findOneByName(name, libraryId);
    if (existing) {
      return existing;
    }

    return await this._categoryRepository.save(new Category({ name }));
  }

  public async findOrCreateMany(
    names: string[],
    libraryId: string,
  ): Promise<Category[]> {
    return await Promise.all(
      [...new Set(names)].map((name) => this.findOrCreate(name, libraryId)),
    );
  }
}
