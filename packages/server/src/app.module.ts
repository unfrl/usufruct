import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './config';
import { ItemModule } from './item';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
