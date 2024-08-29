// TODO:
// ! Handle refresh tokens 
// ! Add hashing
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user?.password !== pass)
      throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email }; // ! refresh token
    // const { password, ...result } = user;
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async signUp(email: string, pass: string): Promise<any> {
    const user = await this.usersService.create(email, pass);

    if (!user)
      throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email }; // ! refresh token
    // const { password, ...result } = user;
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
