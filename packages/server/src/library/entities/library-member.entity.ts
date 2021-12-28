import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from 'src/identity';
import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';
import { Library } from './library.entity';

export enum LibraryMemberRole {
  Owner = 'owner',
  Admin = 'admin',
  Standard = 'standard',
}

@Entity()
export class LibraryMember {
  @ApiResponseProperty()
  @PrimaryColumn()
  @Index()
  public libraryId: string;

  @ApiResponseProperty()
  @PrimaryColumn()
  @Index()
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
    Object.assign(this, member);
  }
}
