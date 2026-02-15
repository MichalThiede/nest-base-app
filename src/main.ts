import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config/app.config';
import { globalValidationPipe } from './common/pipes/global.validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { PinoLogger } from 'nestjs-pino/PinoLogger';
import { requestIdMiddleware } from './common/middleware/request-id.middleware';
import { helmetMiddleware } from './common/middleware/helmet.middleware';
import { compressionMiddleware } from './common/middleware/compression.middleware';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const nodeEnv = process.env.NODE_ENV ?? 'development';

  if (nodeEnv === 'development') {
    app.enableCors({
      origin: ['http://localhost:4200'],
      credentials: true,
    });
  }

  const document = SwaggerModule.createDocument(app, swaggerConfig());
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(globalValidationPipe);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(requestIdMiddleware);
  app.use(helmetMiddleware);
  app.use(compressionMiddleware);
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const appConfig = configService.getOrThrow<IAppConfig>('app');

  const logger = await app.resolve(PinoLogger);

  await app.listen(appConfig.port);
  logger.info(`App running on port ${appConfig.port} in ${appConfig.nodeEnv} mode.`);
}
void bootstrap();
