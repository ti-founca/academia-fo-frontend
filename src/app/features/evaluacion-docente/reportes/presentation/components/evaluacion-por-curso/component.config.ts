import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EstamentoFacade } from "@features/evaluacion-docente/reportes/application/facade/estamento.facade";
import { EvaluacionGeneralDocenteFacade } from "@features/evaluacion-docente/reportes/application/facade/evaluacion-general-docente.facade";
import { ReporteEvaluacionGeneralQuery } from "@features/evaluacion-docente/reportes/application/port/reporte-evaluacion-general.port";
import { EstamentoApiService } from "@features/evaluacion-docente/reportes/data/estamento-api.service";
import { ReporteEvaluacionGeneralApiService } from "@features/evaluacion-docente/reportes/data/reporte-evaluacion-general-api.service";
import { EstamentoRepository } from "@features/evaluacion-docente/reportes/domain/repository/estamento.repository";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzFlexModule } from "ng-zorro-antd/flex";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSegmentedModule } from "ng-zorro-antd/segmented";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzTabsModule } from "ng-zorro-antd/tabs";

export default {
    imports: [
        NzGridModule,
        NzIconModule,
        NzBadgeModule,
        NzSpaceModule,
        RouterModule,
        NzFlexModule,
        NzButtonModule,
        NzTabsModule,
        NzTableModule,
        NzSegmentedModule,
        NzCollapseModule,
        FormsModule,
        NzSelectModule,
        NzEmptyModule,
        NzSkeletonModule
    ],
    providers: [
        EstamentoFacade,
        EvaluacionGeneralDocenteFacade,
        { provide: EstamentoRepository, useClass: EstamentoApiService },
        { provide: ReporteEvaluacionGeneralQuery, useClass: ReporteEvaluacionGeneralApiService }
    ]
}