import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { pinoConfig } from './pino.config';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: pinoConfig,
    }),
  ],
})
export class LoggerModule {}
