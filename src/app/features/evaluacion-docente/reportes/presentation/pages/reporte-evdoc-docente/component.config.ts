import { DecimalPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DocentePeriodoFacade } from "@features/evaluacion-docente/reportes/application/facade/docente-periodo.facade";
import { DocenteFacade } from "@features/evaluacion-docente/reportes/application/facade/docente.facade";
import { EvaluacionGeneralDocenteFacade } from "@features/evaluacion-docente/reportes/application/facade/evaluacion-general-docente.facade";
import { NominaDocenteFacade } from "@features/evaluacion-docente/reportes/application/facade/nomina-docente.facade";
import { PeriodoLectivoFacade } from "@features/evaluacion-docente/reportes/application/facade/periodo-lectivo.facade";
import { ReporteEvaluacionGeneralQuery } from "@features/evaluacion-docente/reportes/application/port/reporte-evaluacion-general.port";
import { DocenteApiService } from "@features/evaluacion-docente/reportes/data/docente-api.service";
import { NominaDocenteApiService } from "@features/evaluacion-docente/reportes/data/nomina-docente-api.service";
import { PeriodoLectivoApiService } from "@features/evaluacion-docente/reportes/data/periodo-lectivo-api.service";
import { ReporteEvaluacionGeneralApiService } from "@features/evaluacion-docente/reportes/data/reporte-evaluacion-general-api.service";
import { DocenteRepository } from "@features/evaluacion-docente/reportes/domain/repository/docente.repository";
import { NominaDocenteRepository } from "@features/evaluacion-docente/reportes/domain/repository/nomina-docente.repository";
import { PeriodoLectivoRepository } from "@features/evaluacion-docente/reportes/domain/repository/periodo-lectivo.repository";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzFlexModule } from "ng-zorro-antd/flex";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSegmentedModule } from "ng-zorro-antd/segmented";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzTagModule } from "ng-zorro-antd/tag";

export default {
    imports: [
        NzGridModule,
        NzSegmentedModule,
        NzIconModule,
        NzBadgeModule,
        NzFlexModule,
        FormsModule,
        NzButtonModule,
        NzDescriptionsModule,
        DecimalPipe,
        NzTabsModule,
        NzCollapseModule,
        NzTagModule,
        NzTableModule,
        NzAlertModule,
        NzSpinModule
    ],
    providers: [
        NominaDocenteFacade,
        DocentePeriodoFacade,
        DocenteFacade,
        EvaluacionGeneralDocenteFacade,
        PeriodoLectivoFacade,
        { provide: PeriodoLectivoRepository, useClass: PeriodoLectivoApiService },
        { provide: NominaDocenteRepository, useClass: NominaDocenteApiService },
        { provide: DocenteRepository, useClass: DocenteApiService },
        { provide: ReporteEvaluacionGeneralQuery, useClass: ReporteEvaluacionGeneralApiService }
    ]
}