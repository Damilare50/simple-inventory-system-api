import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'node-config-ts';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(config.PORT);
}
bootstrap();
