import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as IORedis from 'ioredis';
import { User } from './entities';
import { UserService } from './user.service';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), IORedis],
  providers: [UserService, VerificationService],
  exports: [UserService],
  controllers: [VerificationController],
})
export class UserModule {}
