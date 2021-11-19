import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './config';
import { ItemsModule } from './items';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
