import { ReactiveFormsModule } from "@angular/forms"
import { ReporteEvaluacionGeneralQuery } from "@features/evaluacion-docente/reportes/application/port/reporte-evaluacion-general.port"
import { EvaluacionGeneralDocenteFacade } from "@features/evaluacion-docente/reportes/application/facade/evaluacion-general-docente.facade"
import { ReporteEvaluacionGeneralApiService } from "@features/evaluacion-docente/reportes/data/reporte-evaluacion-general-api.service"
import { NzButtonModule } from "ng-zorro-antd/button"
import { NzFlexModule } from "ng-zorro-antd/flex"
import { NzGridModule } from "ng-zorro-antd/grid"
import { NzIconModule } from "ng-zorro-antd/icon"
import { NzSelectModule } from "ng-zorro-antd/select"
import { NzTableModule } from "ng-zorro-antd/table"
import { NzSpaceModule } from "ng-zorro-antd/space"
import { NzDrawerModule } from "ng-zorro-antd/drawer"
import { NzBadgeModule } from "ng-zorro-antd/badge"
import { RouterModule } from "@angular/router"
import { NzSegmentedModule } from "ng-zorro-antd/segmented"
import { DecimalPipe } from "@angular/common"

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
        NzSegmentedModule,
        DecimalPipe
    ],
    providers: [
        EvaluacionGeneralDocenteFacade,
        { provide: ReporteEvaluacionGeneralQuery, useClass: ReporteEvaluacionGeneralApiService }
    ]

}