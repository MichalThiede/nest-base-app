import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  public constructor(private health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  public check(): Promise<{ status: string }> {
    return this.health.check([]);
  }
}
