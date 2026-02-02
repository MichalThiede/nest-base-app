import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation';
import { appConfigFactory } from './config/app.config.factory';
import { LoggerModule } from './logger/logger.module';
import { GlobalThrottlerModule } from './common/throttler/throttler.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { HealthModule } from './common/health/health.module';

const nodeEnv = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/.env.${nodeEnv}`,
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
      load: [appConfigFactory],
    }),
    LoggerModule,
    GlobalThrottlerModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
