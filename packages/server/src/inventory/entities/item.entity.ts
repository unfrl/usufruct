import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseEntity, getShortId } from 'src/common';
import { Library } from 'src/library';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';
import { Label } from './label.entity';

@Entity()
export class Item extends BaseEntity {
  @ApiResponseProperty()
  @Column()
  public name: string;

  @ApiResponseProperty()
  @Column({ unique: true })
  public shortId: string;

  @BeforeInsert()
  private befortInsert() {
    this.shortId = getShortId();
  }

  @ApiResponseProperty()
  @Column()
  public description: string;

  @ApiResponseProperty({ type: [Category] })
  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  public categories: Category[];

  @ApiResponseProperty({ type: [Label] })
  @ManyToMany(() => Label, { eager: true })
  @JoinTable()
  public labels: Label[];

  @ApiResponseProperty()
  @Index()
  @Column()
  public libraryId: string;

  @ManyToOne(() => Library)
  public library: Library;

  public constructor(item: Partial<Item>) {
    super();
    Object.assign(this, item);
  }
}
