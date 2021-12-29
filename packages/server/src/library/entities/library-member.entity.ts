import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from 'src/identity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @ApiResponseProperty({ enum: LibraryMemberRole })
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

  @ApiResponseProperty()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date;

  @ApiResponseProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date;

  public constructor(member: Partial<LibraryMember>) {
    Object.assign(this, member);
  }
}
