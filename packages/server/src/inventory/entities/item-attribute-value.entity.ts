import { Timestamps } from 'src/common';
import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';
import { ItemAttribute } from './item-attribute.entity';
import { Item } from './item.entity';

@Entity()
export class ItemAttributeValue {
  @Column()
  @PrimaryColumn()
  @Index()
  public itemId: string;

  @Column()
  @PrimaryColumn()
  @Index()
  public itemAttributeId: string;

  @ManyToOne(() => Item)
  public item: Item;

  @ManyToOne(() => ItemAttribute)
  public itemAttribute: ItemAttribute;

  @Column()
  public value: string;

  @Column(() => Timestamps, { prefix: false })
  public timestamps: Timestamps;

  public constructor(itemAttributeValue: Partial<ItemAttributeValue>) {
    Object.assign(this, itemAttributeValue);
  }
}
