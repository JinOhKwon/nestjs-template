import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from 'filters';
import { HttpLoggingInterceptor } from 'interceptors';
import { AwsModule, ConfigModule, HealthModule, LoggerModule, RedisModule, RouteScanModule, WssModule } from 'core';
import { BizModule } from './modules/biz.module';

/**
 * app 모듈
 */
@Module({
  imports: [LoggerModule, AwsModule, ConfigModule, HealthModule, RedisModule, RouteScanModule, WssModule, BizModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    // TODO: 컴슈머가 뭐하는 놈인지 알아보고 정리하자
    consumer.apply().forRoutes('*');
    consumer.apply();
  }
}
