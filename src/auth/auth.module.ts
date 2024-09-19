import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    { 
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
  imports: [
    JwtModule.registerAsync({ // ! remove default values if you want to add refresh tokens (use other secret)
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('TOKEN_SECRET'),
        signOptions: { expiresIn: '1d' }
      }),
      inject: [ConfigService]
    }),
    UsersModule
  ],
  exports: [AuthService]
})
export class AuthModule {}
