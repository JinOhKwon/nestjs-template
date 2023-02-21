import { createMock } from '@golevelup/ts-jest';
import { CallHandler, ExecutionContext, INestApplication } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { LoggerModule, LoggerService, winstonConfig } from 'core';
import { lastValueFrom, of } from 'rxjs';
import { HttpLoggingInterceptor } from './logging.interceptor';

describe('loggingInterceptor 테스트', () => {
  let app: INestApplication;
  let interceptor: HttpLoggingInterceptor;
  const mockExecutionContext = createMock<ExecutionContext>();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: HttpLoggingInterceptor,
        },
      ],
    }).compile();
    interceptor = new HttpLoggingInterceptor(new LoggerService());
    app = moduleRef.createNestApplication();
    app.useLogger(winstonConfig(process.env['NODE_ENV']));
  });

  afterAll(async () => {
    await app.close();
  });

  it('loggingInterceptor 인터셉터 호출', () => {
    expect(interceptor).toBeDefined();
  });

  describe('loggingInterceptor 함수 호출', () => {
    it('intercept() ->', async () => {
      const nextSpy: CallHandler<any> = {
        handle: () =>
          of({
            what: 'ever',
            value: {
              name: 'Mario',
              something: 'else',
            },
          }),
      };

      await expect(lastValueFrom(interceptor.intercept(mockExecutionContext, nextSpy))).resolves.toEqual({
        what: 'ever',
        value: {
          name: 'Mario',
          something: 'else',
        },
      });
    });
  });
});
