import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, RedisOptions } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Gets information about the health status' })
  check(): Promise<HealthCheckResult> {
    const host = this.configService.get('REDIS_HOST');
    const port = this.configService.get('REDIS_PORT');

    const url = `redis://${host}:${port}`;

    return this.health.check([
      async (): Promise<HealthIndicatorResult> =>
        this.microservice.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            url,
          },
        }),
    ]);
  }
}
