import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date;

  public constructor(itemAttributeValue: Partial<ItemAttributeValue>) {
    Object.assign(this, itemAttributeValue);
  }
}
