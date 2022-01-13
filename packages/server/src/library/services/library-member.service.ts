import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibraryMember } from '../entities';

@Injectable()
export class LibraryMemberService {
  public constructor(
    @InjectRepository(LibraryMember)
    private readonly _libraryMemberRepository: Repository<LibraryMember>,
  ) {}

  public async findOne(
    libraryId: string,
    userId: string,
  ): Promise<LibraryMember | undefined> {
    return await this._libraryMemberRepository.findOne({
      where: { libraryId, userId },
    });
  }

  public async findByUserId(userId: string): Promise<LibraryMember[]> {
    return await this._libraryMemberRepository.find({
      where: { userId },
      relations: ['library'],
    });
  }
}
