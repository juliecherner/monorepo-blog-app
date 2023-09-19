import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';
import {corsConfig} from 'cors.config';
import { envConfig } from './env-config';

const swaggerSetup = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
      },
      'default',
    )
    .setTitle('Postblog API')
    .setDescription('The blog API description')
    .setVersion('1.0')
    .addTag('Post api routes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = envConfig.server.port;
  const host = envConfig.server.host;

  swaggerSetup(app);
  app.enableCors(corsConfig);
  
  await app.listen(port, host, () => {
    Logger.log(`Server running on http://${host}:${port}`);
  });
}

bootstrap();
