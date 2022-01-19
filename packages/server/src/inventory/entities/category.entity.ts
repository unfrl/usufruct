import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Library } from 'src/library';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity()
@Index(['name', 'libraryId'])
export class Category extends BaseEntity {
  @ApiResponseProperty()
  @Column()
  public name: string;

  @ApiResponseProperty()
  @Column({ nullable: true })
  public description?: string;

  @ApiResponseProperty()
  @Column()
  public libraryId: string;

  @ManyToOne(() => Library)
  public library: Library;

  public constructor(category: Partial<Category>) {
    super();
    Object.assign(this, category);
  }
}
