import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/common';

export enum ItemAttributeDataType {
  String = 'string',
  Number = 'number',
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
