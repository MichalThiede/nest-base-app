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
import { VersionModule } from './common/version/version.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { MongoModule } from './database/mongo/mongo.module';
import { mongoConfig } from './config/mongo.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

const nodeEnv = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/.env.${nodeEnv}`,
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
      load: [appConfigFactory, mongoConfig],
    }),
    LoggerModule,
    GlobalThrottlerModule,
    HealthModule,
    VersionModule,
    PrismaModule,
    MongoModule,
    UsersModule,
    AuthModule,
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
