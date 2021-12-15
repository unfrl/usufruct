import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

export enum ItemAttributeDataType {
  String = 'string',
  Number = 'number',
}

@Entity()
export class ItemAttribute extends BaseEntity {
  @ApiResponseProperty()
  @Column({ unique: true })
  public name: string;

  @ApiResponseProperty()
  @Column({ nullable: true })
  public description: string | null;

  @ApiResponseProperty()
  @Column({
    type: 'enum',
    enum: ItemAttributeDataType,
    default: ItemAttributeDataType.String,
  })
  public dataType: ItemAttributeDataType;

  public constructor(itemAttribute: Partial<ItemAttribute>) {
    super();
    Object.assign(this, itemAttribute);
  }
}
