import { API_BASE_URL } from "@core/config/api.config";
import { effect, inject, Injector, Signal, untracked } from "@angular/core";
import { RepoResource } from "@shared/type/repo-resource";
import { Docente } from "../domain/model/docente.model";
import { DocenteRepository } from "../domain/repository/docente.repository";
import { httpResource } from "@angular/common/http";
import { toRepoResource } from "@shared/util/repo-resource.util";

export class DocenteApiService extends DocenteRepository {
    private readonly apiUrl = `${API_BASE_URL}/personas`;
    private readonly injector = inject(Injector);   
    
    findById(idDocente: Signal<number | undefined>): RepoResource<Docente | undefined> {
        const resource = httpResource<Docente | undefined>(() => {
            const id = idDocente();
            if(id == null) return undefined;
            return `${this.apiUrl}/${id}`;
        }, { defaultValue: undefined, injector: this.injector });
        return toRepoResource(resource);
    }

}