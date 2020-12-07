import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class TranslationEntity {
  @ApiProperty({
    example: 'These dark pillars may look destructive...',
  })
  original: string;

  @ApiProperty({
    example: 'Esses pilares escuros podem parecer destrutivos...',
  })
  ptBR: string;
}

export class ApodEntity {
  @ApiProperty({
    example: 'Jean-Yves Letellier',
  })
  copyright: string;

  @ApiProperty({
    example: '2020-12-05',
  })
  date: string;

  @ApiProperty({
    type: TranslationEntity,
  })
  explanation: TranslationEntity;

  @ApiProperty({
    example: 'https://apod.nasa.gov/apod/image/2012/MonsRumker_Letellier.jpg',
  })
  hdurl: string;

  @ApiProperty({
    example: 'image',
  })
  media_type: string;

  @ApiProperty({
    type: TranslationEntity,
  })
  title: TranslationEntity;

  @ApiProperty({
    example: 'https://apod.nasa.gov/apod/image/2012/MonsRumker_Letellier.jpg',
  })
  url: string;

  @Exclude()
  service_version: string;

  constructor(partial: Partial<ApodEntity>) {
    Object.assign(this, partial);
  }
}
