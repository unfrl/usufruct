import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class UpsertItemDto {
  @ApiProperty()
  @IsDefined()
  public name: string;

  @ApiPropertyOptional()
  public description: string;

  @ApiProperty()
  public categoryNames: string[];

  @ApiProperty()
  public labelNames: string[];
}
