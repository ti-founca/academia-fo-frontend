import { ReactiveFormsModule } from "@angular/forms"
import { EvaluacionGeneralDocenteExporter } from "@features/evaluacion-docente/reportes/application/port/evaluacion-general-docente-exporter.port"
import { EvaluacionGeneralDocenteFacade } from "@features/evaluacion-docente/reportes/application/facade/evaluacion-general-docente.facade"
import { PeriodoLectivoFacade } from "@features/evaluacion-docente/reportes/application/facade/periodo-lectivo.facade"
import { EvaluacionGeneralDocenteApiService } from "@features/evaluacion-docente/reportes/data/evaluacion-general-docente-api.service"
import { EvaluacionGeneralDocenteExporterApiService } from "@features/evaluacion-docente/reportes/data/evaluacion-general-docente-exporter-api.service"
import { PeriodoLectivoApiService } from "@features/evaluacion-docente/reportes/data/periodo-lectivo-api.service"
import { EvaluacionGeneralDocenteRepository } from "@features/evaluacion-docente/reportes/domain/repository/evaluacion-general-docente.repository"
import { PeriodoLectivoRepository } from "@features/evaluacion-docente/reportes/domain/repository/periodo-lectivo.repository"
import { NzButtonModule } from "ng-zorro-antd/button"
import { NzFlexModule } from "ng-zorro-antd/flex"
import { NzGridModule } from "ng-zorro-antd/grid"
import { NzIconModule } from "ng-zorro-antd/icon"
import { NzSelectModule } from "ng-zorro-antd/select"
import { NzTableModule } from "ng-zorro-antd/table"
import { EvaluacionGeneralDocenteExporterFacade } from "@features/evaluacion-docente/reportes/application/facade/evaluacion-general-docente-exporter.facade"
import { NzSpaceModule } from "ng-zorro-antd/space"
import { NzDrawerModule } from "ng-zorro-antd/drawer"
import { NzBadgeModule } from "ng-zorro-antd/badge"
import { RouterModule } from "@angular/router"
import { NzSegmentedModule } from "ng-zorro-antd/segmented"

export default {
    imports: [
        ReactiveFormsModule,
        NzTableModule,
        NzFlexModule,
        NzButtonModule,
        NzIconModule,
        NzGridModule,
        NzSelectModule,
        NzSpaceModule,
        NzDrawerModule,
        NzBadgeModule,
        RouterModule,
        NzSegmentedModule
    ],
    providers: [
        EvaluacionGeneralDocenteFacade,
        EvaluacionGeneralDocenteExporterFacade,
        { provide: EvaluacionGeneralDocenteRepository, useClass: EvaluacionGeneralDocenteApiService },
        { provide: EvaluacionGeneralDocenteExporter, useClass: EvaluacionGeneralDocenteExporterApiService }
    ]

}