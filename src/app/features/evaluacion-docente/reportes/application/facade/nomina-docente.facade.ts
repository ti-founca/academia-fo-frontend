import { inject, Injectable, Signal } from "@angular/core";
import { NominaDocenteRepository } from "../../domain/repository/nomina-docente.repository";

@Injectable()
export class NominaDocenteFacade {
    private readonly nominaRepository = inject(NominaDocenteRepository);
    
    getDocenteResource(idNomina: Signal<number | undefined>, idDocente: Signal<number | undefined>){
        return this.nominaRepository.findDocenteByNominaDocente(idNomina, idDocente);
    }

    getNominasResourceByPeriodoId(idPeriodo: Signal<number | undefined>){
        return this.nominaRepository.findByPeriodoId(idPeriodo);
    }
}