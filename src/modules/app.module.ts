import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController, PlanetaryController } from '../controllers';

import {
  GoogleTranslateService,
  NasaService,
  PlanetaryService,
} from '../services';

import { RedisModule } from './redis.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, RedisModule, TerminusModule],
  controllers: [PlanetaryController, HealthController],
  providers: [PlanetaryService, NasaService, GoogleTranslateService],
})
export class AppModule {}
