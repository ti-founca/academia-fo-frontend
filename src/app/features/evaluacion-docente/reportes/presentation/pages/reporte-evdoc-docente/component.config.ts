import { DecimalPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NominaDocenteFacade } from "@features/evaluacion-docente/reportes/application/facade/nomina-docente.facade";
import { NominaDocenteApiService } from "@features/evaluacion-docente/reportes/data/nomina-docente-api.service";
import { NominaDocenteRepository } from "@features/evaluacion-docente/reportes/domain/repository/nomina-docente.repository";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzFlexModule } from "ng-zorro-antd/flex";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSegmentedModule } from "ng-zorro-antd/segmented";

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
        DecimalPipe
    ],
    providers: [
        NominaDocenteFacade,
        { provide: NominaDocenteRepository, useClass: NominaDocenteApiService }
    ]
}