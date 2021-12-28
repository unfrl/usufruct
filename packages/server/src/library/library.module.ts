import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryController } from './controllers';
import { Library, LibraryMember } from './entities';
import { LibraryMemberService, LibraryService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Library, LibraryMember])],
  controllers: [LibraryController],
  providers: [LibraryMemberService, LibraryService],
  exports: [LibraryMemberService, LibraryService],
})
export class LibraryModule {}
