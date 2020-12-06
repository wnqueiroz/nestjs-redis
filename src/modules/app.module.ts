import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PlanetaryController } from '../controllers';
import {
  GoogleTranslateService,
  NasaService,
  PlanetaryService,
} from '../services';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [PlanetaryController],
  providers: [PlanetaryService, NasaService, GoogleTranslateService],
})
export class AppModule {}
