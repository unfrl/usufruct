import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth';
import { dbConfig } from './config';
import { ItemModule } from './item';
import { UserModule } from './user';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ItemModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
