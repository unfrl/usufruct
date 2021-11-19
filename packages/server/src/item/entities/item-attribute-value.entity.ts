import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/common';
import { ItemAttribute } from './item-attribute.entity';
import { Item } from './item.entity';

@Entity()
export class ItemAttributeValue extends BaseEntity {
  @Column()
  public itemId: string;

  @ManyToOne(() => Item)
  public item: Item;

  @Column()
  public itemAttributeId: string;

  @ManyToOne(() => ItemAttribute)
  public itemAttribute: ItemAttribute;

  @Column()
  public value: string;
}
