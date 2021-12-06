import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibraryMember } from '../entities';

@Injectable()
export class LibraryService {
  public constructor(
    @InjectRepository(LibraryMember)
    private readonly _libraryMemberRepository: Repository<LibraryMember>,
  ) {}

  public async getLibraryMember(
    libraryId: string,
    userId: string,
  ): Promise<LibraryMember | undefined> {
    return await this._libraryMemberRepository.findOne({
      where: { libraryId, userId },
    });
  }
}
