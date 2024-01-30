/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ACCESS_TOKEN_NAME } from '@project/libs/decorators';
import { AppModule } from './app/app.module';

const setupOpenApi = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Image service')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      ACCESS_TOKEN_NAME
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/spec', app, document, {
    useGlobalPrefix: true,
  });
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('app.port');

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  setupOpenApi(app);
  await app.listen(port);

  Logger.log(
    `🚀 Image microservice is running on: http://localhost:${port}/${globalPrefix}`
  );
};

bootstrap();
