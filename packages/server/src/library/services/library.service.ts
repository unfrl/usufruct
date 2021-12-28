import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DbTransactionService } from 'src/common';
import { getSlug } from 'src/utils';
import { Repository } from 'typeorm';
import { UpsertLibraryDto } from '../dtos';
import { Library, LibraryMember, LibraryMemberRole } from '../entities';

@Injectable()
export class LibraryService {
  public constructor(
    @InjectRepository(Library)
    private readonly _libraryRepository: Repository<Library>,
    @InjectRepository(LibraryMember)
    private readonly _libraryMemberRepository: Repository<LibraryMember>,
    private readonly _dbTransactionService: DbTransactionService,
  ) {}

  public async findOneBySlug(slug: string): Promise<Library | undefined> {
    return await this._libraryRepository.findOne({ where: { slug } });
  }

  public async slugExists(slug: string): Promise<boolean> {
    return Boolean(await this.findOneBySlug(slug));
  }

  public async createLibrary(
    userId: string,
    libraryDto: UpsertLibraryDto,
  ): Promise<Library> {
    const { name, description } = libraryDto;

    const slug = getSlug(name);
    if (await this.slugExists(slug)) {
      throw new BadRequestException(
        'Slug is already in use. Please enter a unique name.',
      );
    }

    return this._dbTransactionService.executeInTransaction(async (manager) => {
      const library = await manager.save(
        new Library({ name, description, slug }),
      );

      await manager.save(
        new LibraryMember({
          library,
          userId,
          role: LibraryMemberRole.Owner,
        }),
      );

      return library;
    });
  }

  public async getLibraryMember(
    libraryId: string,
    userId: string,
  ): Promise<LibraryMember | undefined> {
    return await this._libraryMemberRepository.findOne({
      where: { libraryId, userId },
    });
  }
}
