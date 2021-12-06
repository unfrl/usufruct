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
  @Column()
  public libraryId: string;

  @Column()
  public userId: string;

  @Column({
    type: 'enum',
    enum: LibraryMemberRole,
    default: LibraryMemberRole.Standard,
  })
  public role: LibraryMemberRole;

  @ManyToOne(() => Library)
  public library: Library;

  @ManyToOne(() => User)
  public user: User;
}
