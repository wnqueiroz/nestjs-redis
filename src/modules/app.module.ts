import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PlanetaryController } from '../controllers';
import { NasaService, PlanetaryService } from '../services';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [PlanetaryController],
  providers: [PlanetaryService, NasaService],
})
export class AppModule {}
