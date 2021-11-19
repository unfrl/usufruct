import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum ItemAttributeDataType {
  STRING = 'string',
  NUMBER = 'number',
}

@Entity()
export class ItemAttribute extends BaseEntity {
  @Column()
  public name: string;

  @Column({ nullable: true })
  public description: string | null;

  @Column({
    type: 'enum',
    enum: ItemAttributeDataType,
  })
  public dataType: ItemAttributeDataType;
}
