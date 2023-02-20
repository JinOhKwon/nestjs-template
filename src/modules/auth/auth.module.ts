import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService, CONFIG_KEY } from 'core';
import { UserModule } from '../user/user.module';
import { AuthController } from './api/auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

/**
 * 인증 모듈
 */
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get(CONFIG_KEY.OAUTH.JWT_SECRET_KEY),
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
