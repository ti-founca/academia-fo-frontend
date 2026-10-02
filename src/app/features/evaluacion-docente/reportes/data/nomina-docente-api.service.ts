import { inject, Injectable, Injector, Signal } from "@angular/core";
import { NominaDocenteRepository } from "../domain/repository/nomina-docente.repository";
import { Docente } from "../domain/model/docente.model";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { RepoResource } from "@shared/type/repo-resource";
import { toRepoResource } from "@shared/util/repo-resource.util";
import { NominaDocente } from "../domain/model/nomina-docente.model";

@Injectable()
export class NominaDocenteApiService implements NominaDocenteRepository{
    private readonly injector = inject(Injector)
    
    private apiUrl = 'http://localhost:8080/api';
    private estamentosUrl = `${this.apiUrl}/estamentos`;
    private periodosUrl = `${this.apiUrl}/periodos-lectivos`;
    
    findDocenteByNominaDocente(idNomina: Signal<number | undefined>, idDocente: Signal<number | undefined>): RepoResource<Docente | undefined> {
        const httpRes: HttpResourceRef<Docente | undefined> = httpResource(() => {
            const idNom = idNomina();
            const idDoc = idDocente();
            if(idNom == null || idDoc == null) return undefined;
            return {
                url: `${this.estamentosUrl}/${idNom}/docentes/${idDoc}`
            }
        }, { injector: this.injector });
        return toRepoResource(httpRes);
    }

    findByPeriodoId(idPeriodo: Signal<number | undefined>): RepoResource<NominaDocente[]> {
        const httpRes: HttpResourceRef<NominaDocente[]> = httpResource(() => {
            const idPer = idPeriodo();
            return idPer != null ? `${this.periodosUrl}/${idPer}/nominas` : undefined
        } , { defaultValue: [], injector: this.injector })
        return toRepoResource(httpRes);
    }
}