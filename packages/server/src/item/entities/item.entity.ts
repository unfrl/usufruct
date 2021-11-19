import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/common';

@Entity()
export class Item extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;
}
