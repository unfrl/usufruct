import { RedisModule } from '@nestjs-modules/ioredis';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig, mailModuleConfig, redisConfig } from './config';
import { IdentityModule } from './identity';
import { InventoryModule } from './inventory';
import { LibraryModule } from './library';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    InventoryModule,
    IdentityModule,
    LibraryModule,
    MailerModule.forRootAsync({
      useFactory: () => mailModuleConfig,
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: redisConfig,
      }),
    }),
  ],
  providers: [],
})
export class AppModule {}
