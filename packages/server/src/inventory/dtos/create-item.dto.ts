import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class CreateItemDto {
  @ApiProperty()
  @IsDefined()
  public name: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public categoryNames: string[];
}
