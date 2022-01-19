import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from '../entities';

@Injectable()
export class LabelService {
  public constructor(
    @InjectRepository(Label)
    private readonly _labelRepository: Repository<Label>,
  ) {}

  public async getAll(libraryId: string): Promise<Label[]> {
    return await this._labelRepository.find({ where: { libraryId } });
  }

  public async findOrCreate(name: string, libraryId: string): Promise<Label> {
    const label = await this._labelRepository.findOne({
      where: { name, libraryId },
    });
    if (label) {
      return label;
    }

    return await this._labelRepository.save(new Label({ name, libraryId }));
  }

  public async findOrCreateMany(
    names: string[],
    libraryId: string,
  ): Promise<Label[]> {
    return await Promise.all(
      [...new Set(names)].map((name) => this.findOrCreate(name, libraryId)),
    );
  }
}
