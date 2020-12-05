import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PlanetaryService } from '../services';

import { ApodEntity } from '../entities';

@Controller()
@ApiTags('planetary')
export class PlanetaryController {
  constructor(private readonly planetaryService: PlanetaryService) {}

  @Get('/planetary/apod')
  @ApiOperation({ summary: 'Gets information about the picture of the day' })
  @ApiResponse({
    status: 200,
    description: 'The found picture of the day',
    type: ApodEntity,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async getApod(): Promise<ApodEntity> {
    const apod = await this.planetaryService.getApod();

    return new ApodEntity(apod);
  }
}
