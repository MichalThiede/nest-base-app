import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        limit: 100,
        ttl: 60,
      },
    ]),
  ],
})
export class GlobalThrottlerModule {}
