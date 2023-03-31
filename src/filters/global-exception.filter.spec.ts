import { createMock } from '@golevelup/ts-jest';
import { ArgumentsHost, HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { winstonConfig } from 'core';
import { GlobalExceptionFilter } from './global-exception.filter';

describe('globalExceptionFilter 테스트', () => {
  let app: INestApplication;
  let interceptor: GlobalExceptionFilter;
  const mockArgumentsHost = createMock<ArgumentsHost>();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: APP_FILTER,
          useClass: GlobalExceptionFilter,
        },
      ],
    }).compile();
    interceptor = new GlobalExceptionFilter();
    app = moduleRef.createNestApplication();
    app.useLogger(winstonConfig(process.env['NODE_ENV']));
  });

  afterAll(async () => {
    await app.close();
  });

  it('globalExceptionFilter 필터 호출', () => {
    expect(interceptor).toBeDefined();
  });

  describe('globalExceptionFilter 함수 호출', () => {
    it('catch() ->', async () => {
      const loggerSpy = jest.spyOn(GlobalExceptionFilter.prototype, 'catch');

      interceptor.catch(new HttpException('Http exception', HttpStatus.BAD_REQUEST), mockArgumentsHost);
      expect(loggerSpy).toBeCalledTimes(1);
      expect(loggerSpy).toThrow();
    });
  });
});
