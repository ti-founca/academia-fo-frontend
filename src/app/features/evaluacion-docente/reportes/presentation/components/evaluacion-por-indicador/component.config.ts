import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EstamentoFacade } from "@features/evaluacion-docente/reportes/application/facade/estamento.facade";
import { EstamentoApiService } from "@features/evaluacion-docente/reportes/data/estamento-api.service";
import { EstamentoRepository } from "@features/evaluacion-docente/reportes/domain/repository/estamento.repository";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzFlexModule } from "ng-zorro-antd/flex";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSegmentedModule } from "ng-zorro-antd/segmented";
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
        FormsModule
    ],
    providers: [
        EstamentoFacade,
        { provide: EstamentoRepository, useClass: EstamentoApiService}
    ]
}