import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'date',
    required: false,
    example: '2020-12-06',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async getApod(@Query('date') date: string): Promise<ApodEntity> {
    const apod = await this.planetaryService.getApod(date);

    return new ApodEntity(apod);
  }
}
