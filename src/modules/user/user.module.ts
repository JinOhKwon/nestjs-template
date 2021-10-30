import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleModule } from "modules/role/RoleModule";
import { AuthModule } from "../auth/auth.module";
import { UserController } from "./api/user.controller";
import { UserRepository } from "./repository/user.repository";
import { UserChangeService } from "./service/user-change.service";
import { UserRetireveService } from "./service/user.retireve.service";
import { UserService } from "./service/user.service";

@Module({
    imports: [
        forwardRef(() => AuthModule),
        forwardRef(() => RoleModule),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [UserController],
    exports: [UserService, UserRetireveService, UserChangeService],
    providers: [UserService, UserRetireveService, UserChangeService],
})
export class UserModule { }
