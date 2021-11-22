import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConfig } from 'src/config';
import { User, UserService } from 'src/user';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly _userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.secret,
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const user = await this._userService.findOneById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
