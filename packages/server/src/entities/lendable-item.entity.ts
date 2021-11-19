import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Item } from './item.entity';

@Entity()
export class LendableItem extends BaseEntity {
  @Column()
  public itemId: string;

  @ManyToOne(() => Item)
  public item: Item;
}
