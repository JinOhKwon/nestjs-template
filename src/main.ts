import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CONFIG_KEY } from 'common';
import compression from 'compression';
import helmet from 'helmet';
import { ConfigModule, ConfigService, winstonConfig } from 'modules';
import { AppModule } from './app.module';
import { envInit } from './env-init';


declare const module: any;
const logger = new Logger(bootstrap.name);

async function bootstrap() {
  try {
    // 환경변수 초기화
    await envInit();

    // 익스프레스 서버 생성
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: true,
      logger: winstonConfig(process.env['NODE_ENV']),
    });

    // app.useLogger(app.get(new MmtLoggerService()));

    // 환경변수 서비스
    const configService = app.select(ConfigModule).get(ConfigService);

    // 파이프 인터셉터, 컴프레션 설정
    process.env['NODE_ENV'] === 'production' && app.use(compression());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    // 운영환경일 경우...
    if (configService.isProduction) {
      app.enable('trust proxy');
      app.use(compression());
      app.use(helmet()); // TODO: helment 설치

      app.use(
        Throttle(60, 10)
      );
    } else {
      // TODO: 익숙해지면 지우자localhost:3333/api
      SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, new DocumentBuilder()
        .setTitle('Momentor Server')
        .setDescription('The Momentor API description')
        .setVersion('1.0')
        .addTag('Momentor')
        .build()));
    }

    // 서버 실행
    const port = configService.getNumber(CONFIG_KEY.COMMON.PORT);

    await app.listen(port);
    logger.log(`🚀  Server is listening on port ${port.toString()}`);

    // 모듈 핫리로딩
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (e) {
    logger.error(`❌  Error starting server, ${e}`);
    process.exit();
  }
}

bootstrap().catch((e) => {
  logger.error(`❌  Error starting server, ${e}`);
  throw e;
});
