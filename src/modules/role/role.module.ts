import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleController } from "./api/role.controller";
import { RoleRepository } from "./repository/role.repository";
import { RoleChangeService } from "./service/role-change.service";
import { RoleRetireveService } from "./service/role-retireve.service";
import { RoleService } from "./service/role.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([RoleRepository]),
    ],
    controllers: [RoleController],
    exports: [RoleService, RoleRetireveService, RoleChangeService],
    providers: [RoleService, RoleRetireveService, RoleChangeService],
})
export class RoleModule { }
