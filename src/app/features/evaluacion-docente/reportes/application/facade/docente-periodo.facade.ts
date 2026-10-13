import { inject, Injectable, Signal } from "@angular/core";
import { PeriodoLectivoRepository } from "../../domain/repository/periodo-lectivo.repository";

@Injectable()
export class DocentePeriodoFacade {
    private readonly periodoRepository = inject(PeriodoLectivoRepository);

    getMateriasResource(idPeriodo: Signal<number | undefined>, idDocente: Signal<number | undefined>){
        return this.periodoRepository.findMateriasByPeriodoDocente(idPeriodo, idDocente);
    }
}
