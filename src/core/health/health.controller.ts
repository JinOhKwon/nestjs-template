import { Controller, Get, OnApplicationShutdown } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { LoggerService } from 'core/logger';

@Controller('health')
export class HealthController implements OnApplicationShutdown {
  private readonly loggerService = new LoggerService(HealthController.name);
  constructor(
    private healthCheckService: HealthCheckService,
    private memoryHealthIndicator: MemoryHealthIndicator,
  ) { }

  /**
   * 앱이 종료 되었을때 호출되는 훅이다.
   * @param signal 시그널
   */
  onApplicationShutdown(signal?: string) {
    // TODO 비정상 종료를 잡아서 슬랙알람을 주자
    this.loggerService.log(`momentor server down... ${signal}`);
  }

  @Get()
  @HealthCheck()
  check() {
    return {
      status: 'ok',
    };
  }

  @Get('heap')
  @HealthCheck()
  checkHeap() {
    return this.healthCheckService.check([
      // The process should not have more than 300MB RSS memory allocated
      () => this.memoryHealthIndicator.checkHeap('memory heap', 500 * 1024 * 1024),
    ]);
  }

  @Get('rss')
  @HealthCheck()
  checkRss() {
    return this.healthCheckService.check([
      // The process should not have more than 300MB RSS memory allocated
      () => this.memoryHealthIndicator.checkRSS('memory RSS', 500 * 1024 * 1024),
    ]);
  }
}
