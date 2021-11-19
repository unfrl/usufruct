import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './config';
import {
  Item,
  ItemAttribute,
  ItemAttributeValue,
  LendableItem,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([
      LendableItem,
      Item,
      ItemAttribute,
      ItemAttributeValue,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
