import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import { mongoConfig } from '../../config/mongo.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [mongoConfig.KEY],
      useFactory: (config: ConfigType<typeof mongoConfig>) => ({
        uri: config.uri,
      }),
    }),
  ],
})
export class MongoModule {}
