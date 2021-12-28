import { ApiResponseProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamps } from './timestamps.entity';

export abstract class BaseEntity {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column(() => Timestamps, { prefix: false })
  timestamps: Timestamps;
}
