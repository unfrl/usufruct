import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library, LibraryMember } from '../entities';

@Injectable()
export class LibraryService {
  public constructor(
    @InjectRepository(LibraryMember)
    private readonly _libraryMemberRepository: Repository<LibraryMember>,
  ) {}

  // TODO: method was just for testing, remove if unused
  public async getLibrariesByUserId(userId: string): Promise<Library[]> {
    const members = await this._libraryMemberRepository.find({
      where: { userId },
      relations: ['library'],
    });

    return members.map((member) => member.library);
  }
}
