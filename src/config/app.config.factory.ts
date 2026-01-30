import { registerAs } from '@nestjs/config';
import { AppConfig } from './app.config';

export const appConfigFactory = registerAs(
  'app',
  (): AppConfig => ({
    nodeEnv: process.env.NODE_ENV as AppConfig['nodeEnv'],
    port: Number(process.env.APP_PORT),
    name: process.env.APP_NAME as string,
    logLevel: process.env.LOG_LEVEL as AppConfig['logLevel'],
  }),
);
