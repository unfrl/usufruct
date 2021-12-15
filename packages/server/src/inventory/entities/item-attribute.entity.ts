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
  @Column()
  public name: string;

  @ApiResponseProperty()
  @Column({ nullable: true })
  public description: string | null;

  @ApiResponseProperty()
  @Column({
    type: 'enum',
    enum: ItemAttributeDataType,
  })
  public dataType: ItemAttributeDataType;
}
