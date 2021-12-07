import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @ApiResponseProperty()
  @Column()
  public name: string;

  @ApiResponseProperty()
  @Column()
  public description: string;

  public constructor(item: Partial<Item>) {
    super();
    Object.assign(this, item);
  }
}
