import { ReactiveFormsModule } from "@angular/forms";
import { EstamentoFacade } from "@features/evaluacion-docente/reportes/application/facade/estamento.facade";
import { EstamentoApiService } from "@features/evaluacion-docente/reportes/data/estamento-api.service";
import { EstamentoRepository } from "@features/evaluacion-docente/reportes/domain/repository/estamento.repository";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzSelectModule } from "ng-zorro-antd/select";

export default {
    imports: [
        NzGridModule, NzSelectModule, ReactiveFormsModule
    ],
    providers: [
        EstamentoFacade,
        { provide: EstamentoRepository, useClass: EstamentoApiService },
    ]
}
