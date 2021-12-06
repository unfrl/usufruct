import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Library])],
})
export class LibraryModule {}
