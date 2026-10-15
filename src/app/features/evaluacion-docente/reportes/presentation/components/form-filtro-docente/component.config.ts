import { ReactiveFormsModule } from "@angular/forms";
import { PeriodoLectivoFacade } from "@features/evaluacion-docente/reportes/application/facade/periodo-lectivo.facade";
import { PeriodoLectivoApiService } from "@features/evaluacion-docente/reportes/data/periodo-lectivo-api.service";
import { PeriodoLectivoRepository } from "@features/evaluacion-docente/reportes/domain/repository/periodo-lectivo.repository";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzSelectModule } from "ng-zorro-antd/select";

export default {
    imports: [
        NzGridModule, NzSelectModule, ReactiveFormsModule
    ],
    providers: [
        PeriodoLectivoFacade,
        { provide: PeriodoLectivoRepository, useClass: PeriodoLectivoApiService },
    ]
}