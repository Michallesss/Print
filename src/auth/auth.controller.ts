// TODO:
// ! Handle refresh tokens
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/zod.pipe';
import { signSchema } from './schemas/sign.schema';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  @UsePipes(new ZodValidationPipe(signSchema))
  signIn(@Body() body: { email: string, password: string }) { // ? Record<> dto
    return this.authService.signIn(body.email, body.password);
  } 

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  @UsePipes(new ZodValidationPipe(signSchema))
  signUp(@Body() body: { email: string, password: string }) { // ? Record<> dto
    return this.authService.signUp(body.email, body.password);
  }

  // Refresh token route
  // @HttpCode(HttpStatus.OK)
  // @Put('refresh')
  // @UsePipes(new ZodValidationPipe(refreshSchema))
  // refreshToken() {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getProfile(@Request() request) {
    return request.user;
  }
}
