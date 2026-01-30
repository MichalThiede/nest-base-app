export interface AppConfig {
  nodeEnv: 'development' | 'test' | 'production';
  port: number;
  name: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}
