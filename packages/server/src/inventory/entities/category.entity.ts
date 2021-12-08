import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @ApiResponseProperty()
  @Column({ unique: true })
  name: string;

  public constructor(category: Partial<Category>) {
    super();
    Object.assign(this, category);
  }
}
