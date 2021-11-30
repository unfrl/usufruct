import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as IORedis from 'ioredis';
import { authConfig } from 'src/config';
import {
  AuthController,
  UserController,
  VerificationController,
} from './controllers';
import { User } from './entities';
import { AuthService, UserService, VerificationService } from './services';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({
      secret: authConfig.secret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    PassportModule,
    TypeOrmModule.forFeature([User]),
    IORedis,
  ],
  providers: [AuthService, UserService, VerificationService, JwtStrategy],
  controllers: [AuthController, UserController, VerificationController],
})
export class IdentityModule {}
