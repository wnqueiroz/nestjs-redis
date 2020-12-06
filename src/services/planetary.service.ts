import { Injectable } from '@nestjs/common';

import { NasaService } from './nasa.service';
import { GoogleTranslateService } from './google-translate.service';

import { ApodEntity } from '../entities';

@Injectable()
export class PlanetaryService {
  constructor(
    private readonly nasaService: NasaService,
    private readonly googleTranslateService: GoogleTranslateService,
  ) {}

  async getApod(date: string): Promise<any> {
    const apod: ApodEntity = await this.nasaService.getApod(date);

    const { explanation, title } = apod;

    const [translatedExplanation, translatedTitle] = await Promise.all([
      this.googleTranslateService.translate({
        text: explanation,
      }),
      this.googleTranslateService.translate({
        text: title,
      }),
    ]);

    return {
      ...apod,
      title: {
        original: title,
        ptBR: translatedTitle,
      },
      explanation: {
        original: explanation,
        ptBR: translatedExplanation,
      },
    };
  }
}
