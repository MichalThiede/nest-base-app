import { Controller, Get } from '@nestjs/common';

@Controller('version')
export class VersionController {
  @Get()
  public getVersion(): Record<string, string | undefined> {
    return {
      name: 'nest-base-app',
      version: process.env.npm_package_version,
      node: process.version,
      env: process.env.NODE_ENV,
    };
  }
}
