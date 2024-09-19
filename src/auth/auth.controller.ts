// TODO:
// ! Handle refresh tokens
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ZodValidationPipe } from 'src/zod.pipe';
import { signSchema } from './schemas/sign.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(signSchema))
  signIn(@Body() body: { email: string, password: string }) { // ? Record<> dto
    return this.authService.signIn(body.email, body.password);
  } 

  @HttpCode(HttpStatus.CREATED)
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
  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() request) {
    return request.user;
  }
}
