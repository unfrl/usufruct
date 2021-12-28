import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getSlug } from 'src/utils';
import { Connection, Repository } from 'typeorm';
import { UpsertLibraryDto } from '../dtos';
import { Library, LibraryMember, LibraryMemberRole } from '../entities';

@Injectable()
export class LibraryService {
  private readonly _logger = new Logger(LibraryService.name);

  public constructor(
    @InjectRepository(Library)
    private readonly _libraryRepository: Repository<Library>,
    @InjectRepository(LibraryMember)
    private readonly _libraryMemberRepository: Repository<LibraryMember>,
    private readonly _connection: Connection,
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
    const queryRunner = this._connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { name, description } = libraryDto;
      const slug = getSlug(name);

      const library = await queryRunner.manager.save(
        new Library({ name, description, slug }),
      );

      await queryRunner.manager.save(
        new LibraryMember({
          library,
          userId,
          role: LibraryMemberRole.Owner,
        }),
      );

      await queryRunner.commitTransaction();

      this._logger.log('Library successfully created', { userId, libraryDto });

      return library;
    } catch (error) {
      this._logger.error('Failed to create library', {
        error,
        userId,
        libraryDto,
      });

      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException('Unknown error.');
    } finally {
      await queryRunner.release();
    }
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
