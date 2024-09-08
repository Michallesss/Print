// TODO:
// ! Handle refresh tokens 
// ! Add hashing
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    // if (user?.password !== pass) // also run when user is undefined
    if (!await bcrypt.compare(pass, user?.password))
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
      throw new UnauthorizedException("User already exists");

    const payload = { sub: user.id, email: user.email }; // ! refresh token
    // const { password, ...result } = user;
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
