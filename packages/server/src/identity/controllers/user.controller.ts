import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../dtos';
import { UserRequest } from '../interfaces';
import { mapUserToDto } from '../mappers';

@ApiTags('Users')
@Controller('users')
export class UserController {
  @ApiOperation({
    operationId: 'getMyProfile',
    summary: 'Get your user profile',
    description: 'Gets the current user profile',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  public getMyProfile(@Req() request: UserRequest): UserDto {
    return mapUserToDto(request.user);
  }
}
