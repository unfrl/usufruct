import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true })
  public name: string;

  @Column({ length: 50, unique: true })
  public displayName: string;

  @Column({ unique: true })
  public email: string;

  @Column({ default: false })
  public isVerified: boolean;

  @Column({ nullable: true })
  public hashedPassword: string;

  public constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}
