import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto, SignUpDto } from './dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly _authService: AuthService) {}

  @ApiOperation({
    operationId: 'signUp',
    summary: 'Sign up',
    description: 'Sign up a new user',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(200)
  @Post('signup')
  public async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return await this._authService.signUp(signUpDto);
  }

  @ApiOperation({
    operationId: 'signIn',
    summary: 'Sign in',
    description: 'Sign in an existing user',
  })
  @ApiResponse({ status: HttpStatus.OK, type: AuthDto })
  @HttpCode(200)
  @Post('signin')
  public async signIn(@Body() signInDto: SignInDto): Promise<AuthDto> {
    return await this._authService.signIn(signInDto);
  }
}
