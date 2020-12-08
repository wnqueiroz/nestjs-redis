import { Injectable } from '@nestjs/common';

import { NasaService } from './nasa.service';
import { GoogleTranslateService } from './google-translate.service';

import { RedisService } from './redis.service';

@Injectable()
export class PlanetaryService {
  constructor(
    private readonly nasaService: NasaService,
    private readonly googleTranslateService: GoogleTranslateService,
    private readonly redisService: RedisService,
  ) {}

  async getApod(date: string): Promise<any> {
    const cachedPayload = await this.redisService.get(date);

    if (cachedPayload) return cachedPayload;

    const apod = await this.nasaService.getApod(date);

    const { explanation, title } = apod;

    const [translatedExplanation, translatedTitle] = await Promise.all([
      this.googleTranslateService.translate({
        text: explanation,
      }),
      this.googleTranslateService.translate({
        text: title,
      }),
    ]);

    const payload = {
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

    const ttl = 5 * 60; // five minutes

    await this.redisService.set(date, payload, ttl);

    return payload;
  }
}
