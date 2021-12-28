import { ApiResponseProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiResponseProperty()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date;

  @ApiResponseProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date;
}
