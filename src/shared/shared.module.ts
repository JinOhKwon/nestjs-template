import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "./services/config.service";
import { ValidatorService } from "./services/validator.service";

const providers = [ConfigService, ValidatorService];

@Global()
@Module({
    providers,
    imports: [
        JwtModule.registerAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get("JWT_SECRET_KEY")
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [...providers, JwtModule],
})
export class SharedModule { }
