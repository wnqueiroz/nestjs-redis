import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
    example: 'Mons Rumker, a 70 kilometer wide complex of volcanic domes...',
  })
  explanation: string;

  @ApiProperty({
    example: 'https://apod.nasa.gov/apod/image/2012/MonsRumker_Letellier.jpg',
  })
  hdurl: string;

  @ApiProperty({
    example: 'image',
  })
  media_type: string;

  @ApiProperty({
    example: 'Mons Rumker in the Ocean of Storms',
  })
  title: string;

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
