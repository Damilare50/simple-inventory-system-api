import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'node-config-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(config.PORT);
}
bootstrap();
