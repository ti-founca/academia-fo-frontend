import { DecimalPipe } from "@angular/common";
import { EstamentoFacade } from "@features/evaluacion-docente/reportes/application/facade/estamento.facade";
import { ReporteIndicadorFacade } from "@features/evaluacion-docente/reportes/application/facade/reporte-indicador.facade";
import { ReporteIndicadorQuery } from "@features/evaluacion-docente/reportes/application/port/reporte-indicador.port";
import { EstamentoApiService } from "@features/evaluacion-docente/reportes/data/estamento-api.service";
import { ReporteIndicadorApiService } from "@features/evaluacion-docente/reportes/data/reporte-indicador-api.service";
import { EstamentoRepository } from "@features/evaluacion-docente/reportes/domain/repository/estamento.repository";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzTabsModule } from "ng-zorro-antd/tabs";

export default {
    imports: [
        NzTabsModule,
        NzTableModule,
        NzCollapseModule,
        NzEmptyModule,
        NzSkeletonModule,
        DecimalPipe
    ],
    providers: [
        EstamentoFacade,
        ReporteIndicadorFacade,
        { provide: EstamentoRepository, useClass: EstamentoApiService },
        { provide: ReporteIndicadorQuery, useClass: ReporteIndicadorApiService }
    ]
}
