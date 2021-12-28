import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryController } from './controllers';
import { Library, LibraryMember } from './entities';
import { LibraryService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Library, LibraryMember])],
  controllers: [LibraryController],
  providers: [LibraryService],
  exports: [LibraryService],
})
export class LibraryModule {}
