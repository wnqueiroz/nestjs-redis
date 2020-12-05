import { Injectable } from '@nestjs/common';

import { NasaService } from './nasa.service';

@Injectable()
export class PlanetaryService {
  constructor(private readonly nasaService: NasaService) {}

  async getApod(): Promise<any> {
    return this.nasaService.getApod();
  }
}
