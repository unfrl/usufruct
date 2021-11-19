import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dbConfig } from './config';
import { ItemModule } from './item';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), ItemModule],
})
export class AppModule {}
