import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication
} from '@nestjs/platform-fastify';

import * as helmet from 'helmet';
import * as morgan from 'morgan';
import {
	initializeTransactionalContext,
	patchTypeORMRepositoryWithBaseRepository
} from 'typeorm-transactional-cls-hooked';
import { AppModule } from './app.module';
import { GlobalValidationPipe } from './decorators/global-validation.pipe';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
	initializeTransactionalContext();
	patchTypeORMRepositoryWithBaseRepository();
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
		{ cors: true }
	);
	app.use(helmet());

	// 로그 설정
	app.use(morgan('combined'));
	app.useGlobalPipes(new GlobalValidationPipe());

	// 리플렉터
	const reflector = app.get(Reflector);

	// 글로벌 필터 설정
	app.useGlobalFilters(new GlobalExceptionFilter(reflector));
	// 인터셉터 설정
	app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

	const configService = app.select(SharedModule).get(ConfigService);

	if (['development', 'staging'].includes(configService.nodeEnv)) {
		setupSwagger(app);
	}

	const port = configService.getNumber('PORT');
	await app.listen(port);

	console.info(`server running on port ${port}`);
}

bootstrap();
