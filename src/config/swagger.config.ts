import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = () =>
  new DocumentBuilder()
    .setTitle('NestJS Template API')
    .setDescription('API documentation for the template project')
    .setVersion('1.0')
    .build();
