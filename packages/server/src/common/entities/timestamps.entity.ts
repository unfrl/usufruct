import { ApiResponseProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Timestamps {
  @ApiResponseProperty()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date;

  @ApiResponseProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date;
}
