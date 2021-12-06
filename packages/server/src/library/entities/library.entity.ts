import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Library extends BaseEntity {
  @Column()
  public name: string;

  @Column({ nullable: true })
  public description: string;

  @Column()
  public location: string;
}
