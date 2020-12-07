import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, description, version } = require('../package.json');

async function bootstrap() {
  const logger = new Logger('NestApplication');

  const configService = new ConfigService();

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('v1');

  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addTag('planetary')
    .addTag('health')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  const port = configService.get<number>('PORT') || 3030;

  await app.listen(port, () => {
    logger.log(`NestApplication is listening on: ${port}`);
  });
}
bootstrap();
