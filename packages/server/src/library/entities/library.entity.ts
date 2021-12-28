import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Library extends BaseEntity {
  @ApiResponseProperty()
  @Column()
  public name: string;

  @ApiResponseProperty()
  @Column({ nullable: true })
  public description: string;

  @ApiResponseProperty()
  @Column({ unique: true })
  public slug: string;

  public constructor(library: Partial<Library>) {
    super();
    Object.assign(this, library);
  }
}
