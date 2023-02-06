// import { MikroOrmModule } from '@mikro-orm/nestjs';
// import { Global, Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from 'modules';

// /**
//  * 공유 모듈
//  */
// @Global()
// @Module({
//   imports: [
//     MikroOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => configService.mikrOrmConfig,
//       inject: [ConfigService],
//     }),
//   ],
// })
export class DatabaseModule { }
