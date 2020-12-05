import { Controller, Get } from '@nestjs/common';

import { PlanetaryService } from '../services';

@Controller()
export class PlanetaryController {
  constructor(private readonly planetaryService: PlanetaryService) {}

  @Get('/planetary/apod')
  getApod(): Promise<any> {
    return this.planetaryService.getApod();
  }
}
