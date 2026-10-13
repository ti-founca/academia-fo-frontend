import { inject, Injectable, Signal } from "@angular/core";
import { DocenteRepository } from "../../domain/repository/docente.repository";

@Injectable()
export class DocenteFacade {
    private readonly docenteRepository = inject(DocenteRepository); 
    
    getDocenteResource(idDocente: Signal<number | undefined>){
        return this.docenteRepository.findById(idDocente);
    }

}