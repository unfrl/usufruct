import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

/**
 * Class for attaching field-value pairs to an item definition.
 * Used to map "custom fields" to our item's EAV table.
 */
export class CustomFieldDto {
  @ApiProperty()
  @IsDefined()
  public name: string;

  @ApiProperty()
  @IsDefined()
  public value: string;
}
