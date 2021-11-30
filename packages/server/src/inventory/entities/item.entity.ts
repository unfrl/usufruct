import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;
}
