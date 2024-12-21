import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'node-config-ts';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger setup
  const swagger = new DocumentBuilder()
    .setTitle('Simple Inventory API')
    .setVersion('1')
    .build();
  const doc = SwaggerModule.createDocument(app, swagger, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('docs', app, doc);

  await app.listen(config.PORT);
}
bootstrap();
