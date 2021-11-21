import { RedisModule } from '@nestjs-modules/ioredis';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth';
import { dbConfig } from './config';
import { mailModuleConfig } from './config/email.config';
import { redisConfig } from './config/redis.config';
import { ItemModule } from './item';
import { UserModule } from './user';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ItemModule,
    AuthModule,
    UserModule,
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
