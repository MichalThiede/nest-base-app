import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { globalValidationPipe } from './common/pipes/global.validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { PinoLogger } from 'nestjs-pino/PinoLogger';
import { requestIdMiddleware } from './common/middleware/request-id.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(globalValidationPipe);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(requestIdMiddleware);

  const configService = app.get(ConfigService);
  const appConfig = configService.getOrThrow<AppConfig>('app');

  const logger = await app.resolve(PinoLogger);

  await app.listen(appConfig.port || 3000);
  logger.info(
    `App running on port ${appConfig.port} in ${appConfig.nodeEnv} mode.`,
  );
}
void bootstrap();
