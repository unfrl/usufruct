import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Category } from './category.entity';
import { Label } from './label.entity';

@Entity()
export class Item extends BaseEntity {
  @ApiResponseProperty()
  @Column()
  public name: string;

  @ApiResponseProperty()
  @Column()
  public description: string;

  @ApiResponseProperty({ type: [Category] })
  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categories: Category[];

  @ApiResponseProperty({ type: [Label] })
  @ManyToMany(() => Label, { eager: true })
  @JoinTable()
  labels: Label[];

  public constructor(item: Partial<Item>) {
    super();
    Object.assign(this, item);
  }
}
