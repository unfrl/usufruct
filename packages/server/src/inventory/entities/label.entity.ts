import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Label extends BaseEntity {
  @ApiResponseProperty()
  @Column({ unique: true })
  name: string;

  @ApiResponseProperty()
  @Column({ nullable: true })
  description?: string;

  public constructor(label: Partial<Label>) {
    super();
    Object.assign(this, label);
  }
}
