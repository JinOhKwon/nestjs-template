import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CdDtlController } from "./api/cd-dtl.controller";
import { CdGrpController } from "./api/cd-grp.controller";
import { CdDtlRepository } from "./repository/cd-dtl.repository";
import { CdGrpRepository } from "./repository/cd-grp.repository";
import { CdDtlChangeService } from "./service/cd-dtl-change.service";
import { CdDtlRetireveService } from "./service/cd-dtl-retireve.service";
import { CdDtlService } from "./service/cd-dtl.service";
import { CdGrpChangeService } from "./service/cd-grp-change.service";
import { CdGrpRetireveService } from "./service/cd-grp-retireve.service";
import { CdGrpService } from "./service/cd-grp.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CdGrpRepository, CdDtlRepository]),
    ],
    controllers: [CdGrpController, CdDtlController],
    exports: [CdGrpService, CdGrpRetireveService, CdGrpChangeService, CdDtlService, CdDtlRetireveService, CdDtlChangeService],
    providers: [CdGrpService, CdGrpRetireveService, CdGrpChangeService, CdDtlService, CdDtlRetireveService, CdDtlChangeService],
})
export class CdModule { }
