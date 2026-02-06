import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  PrismaHealthIndicator,
  MongooseHealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { PrismaService } from '../../database/prisma/prisma.service';

@Controller('health')
export class HealthController {
  public constructor(
    private health: HealthCheckService,
    private prismaIndicator: PrismaHealthIndicator,
    private mongoIndicator: MongooseHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  public async check(): Promise<unknown> {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> =>
        this.prismaIndicator.pingCheck('postgres', this.prisma),
      async (): Promise<HealthIndicatorResult> => this.mongoIndicator.pingCheck('mongo'),
    ]);
  }
}
