export interface IAppConfig {
  nodeEnv: 'development' | 'test' | 'production';
  port: number;
  name: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}
