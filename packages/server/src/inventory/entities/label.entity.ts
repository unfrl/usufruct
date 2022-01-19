import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Library } from 'src/library';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity()
@Index(['name', 'libraryId'], { unique: true })
export class Label extends BaseEntity {
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

  public constructor(label: Partial<Label>) {
    super();
    Object.assign(this, label);
  }
}
