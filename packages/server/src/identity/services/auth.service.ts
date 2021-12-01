import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { authConfig } from 'src/config';
import { AuthDto, SignInDto, SignUpDto } from '../dtos';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  public async signUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password, displayName } = signUpDto;
    const lowerCaseEmail = email.toLowerCase();

    const existing = await this._userService.findOneByEmail(lowerCaseEmail);
    if (existing) {
      throw new BadRequestException('That email address is already in use.');
    }

    const trimmedDisplayName = displayName.trim();
    if (!trimmedDisplayName) {
      throw new BadRequestException('Display name cannot be blank.');
    }

    if (await this._userService.displayNameExists(trimmedDisplayName)) {
      throw new BadRequestException('Display name already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, authConfig.rounds);
    await this._userService.createUser(
      lowerCaseEmail,
      hashedPassword,
      trimmedDisplayName,
    );
  }

  public async signIn(signInDto: SignInDto): Promise<AuthDto> {
    const { email, password } = signInDto;
    const lowerCaseEmail = email.toLowerCase();

    const user = await this._userService.findOneByEmail(lowerCaseEmail);
    if (!user) {
      throw new UnauthorizedException(
        "That email doesn't match an existing account.",
      );
    }

    const result = await bcrypt.compare(password, user.hashedPassword);
    if (!result) {
      throw new UnauthorizedException("The email and password don't match.");
    }

    if (!user.isVerified) {
      throw new UnauthorizedException("Your account hasn't been verified yet.");
    }

    return this.generateAccessToken(user.id);
  }

  public generateAccessToken(userId: string): AuthDto {
    return {
      accessToken: this._jwtService.sign({ sub: userId }),
    };
  }
}
