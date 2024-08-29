// TODO: 
// ? Add devtools (https://docs.nestjs.com/devtools/overview)
// ? Add rate limiting (https://docs.nestjs.com/security/rate-limiting)
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    UsersModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, /*PrismaService*/], // Prisma service must be initialized with db at first
})
export class AppModule {}
