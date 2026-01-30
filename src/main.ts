import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { globalValidationPipe } from './common/pipes/global.validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(globalValidationPipe);

  const configService = app.get(ConfigService);
  const appConfig = configService.getOrThrow<AppConfig>('app');

  await app.listen(appConfig.port || 3000);
  console.log(
    `🚀 App running on port ${appConfig.port} in ${appConfig.nodeEnv} mode.`,
  );
}
void bootstrap();
