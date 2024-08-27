// TODO: 
// 1. ? Add devtools (https://docs.nestjs.com/devtools/overview)
// 2. ? Add rate limiting (https://docs.nestjs.com/security/rate-limiting)
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, /*PrismaService*/], // Prisma service must be initialized with db at first
})
export class AppModule {}
