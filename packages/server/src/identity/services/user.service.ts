import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { VerificationService } from './verification.service';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _verificationService: VerificationService,
  ) {}

  /**
   * Finds a user by id, returns undefined if not found.
   * @param id - Id of the user
   */
  public async findOneById(id: string): Promise<User | undefined> {
    return await this._userRepository.findOne(id);
  }

  /**
   * Finds a user by email, returns undefined if not found.
   * @param email - Email of the user
   */
  public async findOneByEmail(email: string): Promise<User | undefined> {
    return await this._userRepository.findOne({ where: { email } });
  }

  /**
   * Finds a user by display name, returns undefined if not found.
   * @param displayName - Display name of the user
   */
  public async findOneByDisplayName(
    displayName: string,
  ): Promise<User | undefined> {
    return await this._userRepository.findOne({ where: { displayName } });
  }

  /**
   * Creates a user and returns the new entity.
   * @param email - Email of the user
   * @param hashedPassword - User's hashed password
   * @param displayName - Unique display name for the user
   */
  public async createUser(
    email: string,
    hashedPassword: string,
    displayName: string,
  ): Promise<User> {
    if (!email || !hashedPassword || !displayName) {
      throw new Error('Email, hashed password, and display name are required');
    }

    const user = await this._userRepository.save(
      new User({ email, hashedPassword, displayName }),
    );

    await this._verificationService.sendVerificationEmail(user);

    return user;
  }

  /**
   * Returns true if a user exists with the display name.
   * @param displayName - Display name to check exists
   */
  public async displayNameExists(displayName: string): Promise<boolean> {
    return !!(await this.findOneByDisplayName(displayName));
  }
}
