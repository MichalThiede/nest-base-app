import { Params } from 'nestjs-pino';

export const pinoConfig: Params['pinoHttp'] = {
  level: process.env.LOG_LEVEL ?? 'info',

  genReqId: (req) => (req.headers['x-request-id'] as string) ?? `${Date.now()}-${Math.random()}`,

  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },

  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password',
      'req.body.refreshToken',
    ],
    censor: '[REDACTED]',
  },

  customSuccessMessage: (req, res) => `${req.method} ${req.url} ${res.statusCode}`,

  customErrorMessage: (req, res, error) =>
    `${req.method} ${req.url} ${res.statusCode} - ${error.message}`,

  customProps: (req) => ({
    requestId: req.id,
  }),

  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            singleLine: false,
            indent: 2,
          },
        }
      : undefined,
};
