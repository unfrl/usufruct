import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as IORedis from 'ioredis';
import { UserController, VerificationController } from './controllers';
import { User } from './entities';
import { UserService, VerificationService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User]), IORedis],
  providers: [UserService, VerificationService],
  exports: [UserService],
  controllers: [UserController, VerificationController],
})
export class UserModule {}
