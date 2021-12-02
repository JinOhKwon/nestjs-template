import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

export class ConfigService {
	constructor() {
		const nodeEnv = this.nodeEnv;
		dotenv.config({
			path: `.env.${nodeEnv}`
		});

		// console.info(process.env);
	}

	public get(key: string): string {
		return process.env[key];
	}

	public getNumber(key: string): number {
		return Number(this.get(key));
	}

	get nodeEnv(): string {
		return this.get('env') ?? 'development';
	}

	get typeOrmConfig(): TypeOrmModuleOptions {
		return {
			// 엔티티를 자동 로드 한다.
			autoLoadEntities: true,
			keepConnectionAlive: true,
			type: 'postgres',
			host: this.get('DB_HOST'),
			port: this.getNumber('DB_PORT'),
			username: this.get('DB_USERNAME'),
			password: this.get('DB_PASSWORD'),
			database: this.get('DB_DATABASE'),
			logging: this.nodeEnv === 'development',
			synchronize: this.nodeEnv === 'development'
		};
	}
}
