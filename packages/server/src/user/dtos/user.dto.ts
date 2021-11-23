import { ApiProperty } from '@nestjs/swagger';

/**
 * This DTO is provided to the client on successful authentication.
 */
export class UserDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public displayName: string;
}
