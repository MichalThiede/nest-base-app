import { registerAs } from '@nestjs/config';
import { IAppConfig } from './app.config';

export const appConfigFactory = registerAs(
  'app',
  (): IAppConfig => ({
    nodeEnv: process.env.NODE_ENV as IAppConfig['nodeEnv'],
    port: Number(process.env.APP_PORT),
    name: process.env.APP_NAME as string,
    logLevel: process.env.LOG_LEVEL as IAppConfig['logLevel'],
  }),
);
