import { BaseEntity } from 'src/common';
import { User } from 'src/identity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum AccessControlList {
  PublicRead = 'public-read',
  Private = 'private',
}

@Entity()
export class Attachment extends BaseEntity {
  @Column()
  public key: string;

  @Column()
  public url: string;

  @Column()
  public contentType: string;

  @Column({ type: 'bigint' })
  public size: number;

  @Column({
    type: 'enum',
    enum: AccessControlList,
    default: AccessControlList.PublicRead,
  })
  public acl: AccessControlList;

  @Column()
  public userId: string;

  @ManyToOne(() => User)
  public user: User;

  public constructor(attachment: Partial<Attachment>) {
    super();
    Object.assign(this, attachment);
  }
}
