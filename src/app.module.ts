import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AwsModule, CacheModule, ConfigModule, HealthModule, RouteScanModule, WssModule } from 'core';
import { GlobalExceptionFilter } from 'filters';
import { HttpLoggingInterceptor } from 'interceptors';
import { RootModule } from './modules/root.module';

/**
 * app 모듈
 */
@Module({
  imports: [
    AwsModule,
    ConfigModule,
    HealthModule,
    CacheModule,
    RouteScanModule,
    WssModule,
    RootModule,
    CacheModule
  ],
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
