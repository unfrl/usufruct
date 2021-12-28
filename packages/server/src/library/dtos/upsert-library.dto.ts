import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class UpsertLibraryDto {
  @ApiProperty()
  @Length(1, 50)
  public name: string;

  @ApiPropertyOptional()
  public description: string;
}
