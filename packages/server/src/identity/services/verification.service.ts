import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { MailerService } from '@nestjs-modules/mailer';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { appConfig } from 'src/config';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { VerificationDto } from '../dtos';
import { User } from '../entities';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRedis()
    private readonly _redisClient: Redis,
    private readonly _mailerService: MailerService,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  public async sendVerificationEmail(user: User): Promise<void> {
    const token = uuidv4();
    const redisKey = this.getVerificationTokenRedisKey(token, user.email);

    await this._redisClient.setex(redisKey, 86400, ''); // Currently this sets the key to expire in 1 day (86400 seconds)

    const { host, scheme } = appConfig;
    const verificationUrl = `${scheme}://${host}/verification?token=${token}&email=${user.email}`;

    await this._mailerService.sendMail({
      to: user.email,
      from: 'noreply@carpool+unfrl.com',
      subject: 'Welcome to Carpool!',
      html: `<h1>Welcome!</h1>\n<p>\nThanks for joining Carpool! Please verify your account by clicking\n<a href="${verificationUrl}">here</a>\n</p>\n`,
    });
  }

  public async verifyUser(verificationDto: VerificationDto): Promise<void> {
    const { token, email } = verificationDto;

    const redisKey = this.getVerificationTokenRedisKey(token, email);
    if (!(await this._redisClient.exists(redisKey))) {
      throw new ConflictException(
        'Token provided is either expired or invalid.',
      );
    }

    await this._redisClient.del(redisKey);

    const user = await this._userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User account no longer exists');
    }

    user.isVerified = true;
    await this._userRepository.save(user);
  }

  private getVerificationTokenRedisKey(token: string, email: string) {
    return `VERTOKEN_${email}_${token}`;
  }
}
