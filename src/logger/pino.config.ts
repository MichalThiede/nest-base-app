import { Params } from 'nestjs-pino';

export const pinoConfig: Params['pinoHttp'] = {
  level: process.env.LOG_LEVEL ?? 'info',
  genReqId: (req) => req.headers['x-request-id'] as string,
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            singleLine: true,
          },
        }
      : undefined,
};
