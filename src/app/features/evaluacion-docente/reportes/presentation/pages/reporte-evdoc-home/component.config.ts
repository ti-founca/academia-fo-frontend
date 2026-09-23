import { FormsModule } from "@angular/forms";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzFlexModule } from "ng-zorro-antd/flex";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSegmentedModule } from "ng-zorro-antd/segmented";
import { EvaluacionGeneral } from "../../components/evaluacion-general/evaluacion-general";
import { EvaluacionPorIndicador } from "../../components/evaluacion-por-indicador/evaluacion-por-indicador";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { FormFiltroGeneral } from "../../components/form-filtro-general/form-filtro-general";
import { FormFiltroIndicador } from "../../components/form-filtro-indicador/form-filtro-indicador";

export default {
    imports: [
        FormsModule,
        NzGridModule,
        NzBadgeModule,
        NzIconModule,
        NzSegmentedModule,
        NzFlexModule,
        NzButtonModule,
        EvaluacionGeneral,
        EvaluacionPorIndicador,
        NzDrawerModule,
        FormFiltroGeneral,
        FormFiltroIndicador
    ],
    providers: [
        NzNotificationService
    ]
}