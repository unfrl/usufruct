import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { User } from 'src/identity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Library } from './library.entity';

export enum LibraryMemberRole {
  Owner = 'owner',
  Admin = 'admin',
  Standard = 'standard',
}

@Entity()
export class LibraryMember extends BaseEntity {
  @ApiResponseProperty()
  @Column()
  public libraryId: string;

  @ApiResponseProperty()
  @Column()
  public userId: string;

  @ApiResponseProperty()
  @Column({
    type: 'enum',
    enum: LibraryMemberRole,
    default: LibraryMemberRole.Standard,
  })
  public role: LibraryMemberRole;

  @ApiResponseProperty()
  @ManyToOne(() => Library)
  public library: Library;

  @ManyToOne(() => User)
  public user: User;

  public constructor(member: Partial<LibraryMember>) {
    super();
    Object.assign(this, member);
  }
}
