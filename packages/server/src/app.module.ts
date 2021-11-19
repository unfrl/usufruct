import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { dbConfig } from './config';
import { Item } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Item])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
