// TODO:
// ! Handle refresh tokens
// ? Change to @Protected() decorator (https://docs.nestjs.com/security/authentication#enable-authentication-globally)
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization.split(' ') ?? []; // ! ERROR [ExceptionsHandler] Cannot read properties of undefined (reading 'split')
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate( // ? async 
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token)
      throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: this.configService.getOrThrow<string>('TOKEN_SECRET') }, 
      );
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
