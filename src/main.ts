// TODO:
// 1. ? Add helmet (https://docs.nestjs.com/security/helmet)
// 2. ? Add cors (https://docs.nestjs.com/security/cors)
// 3. ? Add swagger (https://docs.nestjs.com/openapi/introduction)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
