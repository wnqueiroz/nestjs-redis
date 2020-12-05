import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const logger = new Logger('NestApplication');

  const configService = new ConfigService();

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('v1');

  const port = configService.get<number>('PORT') || 3030;

  await app.listen(port, () => {
    logger.log(`NestApplication is listening on: ${port}`);
  });
}
bootstrap();
