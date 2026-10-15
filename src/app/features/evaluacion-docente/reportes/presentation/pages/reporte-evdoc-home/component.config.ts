import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzFlexModule } from "ng-zorro-antd/flex";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSegmentedModule } from "ng-zorro-antd/segmented";
import { EvaluacionPorDocente } from "../../components/evaluacion-por-docente/evaluacion-por-docente";
import { EvaluacionPorCurso } from "../../components/evaluacion-por-curso/evaluacion-por-curso";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { FormFiltroDocente } from "../../components/form-filtro-docente/form-filtro-docente";
import { FormFiltroCurso } from "../../components/form-filtro-curso/form-filtro-curso";
import { NzSelectModule } from "ng-zorro-antd/select";
import { PeriodoLectivoFacade } from "@features/evaluacion-docente/reportes/application/facade/periodo-lectivo.facade";
import { PeriodoLectivoApiService } from "@features/evaluacion-docente/reportes/data/periodo-lectivo-api.service";
import { PeriodoLectivoRepository } from "@features/evaluacion-docente/reportes/domain/repository/periodo-lectivo.repository";

export default {
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NzGridModule,
        NzBadgeModule,
        NzIconModule,
        NzSegmentedModule,
        NzFlexModule,
        NzButtonModule,
        EvaluacionPorDocente,
        EvaluacionPorCurso,
        NzDrawerModule,
        FormFiltroDocente,
        FormFiltroCurso,
        NzSelectModule
    ],
    providers: [
        NzNotificationService,
        PeriodoLectivoFacade,
        { provide: PeriodoLectivoRepository, useClass: PeriodoLectivoApiService },
    ]
}