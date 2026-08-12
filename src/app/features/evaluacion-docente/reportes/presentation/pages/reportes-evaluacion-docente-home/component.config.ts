import { ReactiveFormsModule } from "@angular/forms"
import { EvaluacionGeneralDocenteFacade } from "@features/evaluacion-docente/reportes/application/evaluacion-general-docente.facade"
import { PeriodoLectivoFacade } from "@features/evaluacion-docente/reportes/application/periodo-lectivo.facade"
import { EvaluacionGeneralDocenteApiService } from "@features/evaluacion-docente/reportes/data/evaluacion-general-docente-api.service"
import { PeriodoLectivoApiService } from "@features/evaluacion-docente/reportes/data/periodo-lectivo-api.service"
import { EvaluacionGeneralDocenteRepository } from "@features/evaluacion-docente/reportes/domain/repository/evaluacion-general-docente.repository"
import { PeriodoLectivoRepository } from "@features/evaluacion-docente/reportes/domain/repository/periodo-lectivo.repository"
import { NzButtonModule } from "ng-zorro-antd/button"
import { NzFlexModule } from "ng-zorro-antd/flex"
import { NzGridModule } from "ng-zorro-antd/grid"
import { NzIconModule } from "ng-zorro-antd/icon"
import { NzSelectModule } from "ng-zorro-antd/select"
import { NzTableModule } from "ng-zorro-antd/table"

export default {
    imports: [
        NzTableModule,
        NzFlexModule,
        NzButtonModule,
        NzIconModule,
        NzGridModule,
        NzSelectModule,
        ReactiveFormsModule
    ],
    providers: [
        EvaluacionGeneralDocenteFacade,
        PeriodoLectivoFacade,
        { provide: EvaluacionGeneralDocenteRepository, useClass: EvaluacionGeneralDocenteApiService },
        { provide: PeriodoLectivoRepository, useClass: PeriodoLectivoApiService}
    ]

}