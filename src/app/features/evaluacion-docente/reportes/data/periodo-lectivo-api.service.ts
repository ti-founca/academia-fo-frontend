import { HttpClient, HttpParams, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, Injector, Signal } from '@angular/core';
import { PeriodoLectivoRepository } from '../domain/repository/periodo-lectivo.repository';
import { PageRequest } from '@shared/pagination/page-request.model';
import { PaginatedResponse } from '@shared/pagination/paginated-response.model';
import { Observable } from 'rxjs';
import { PeriodoLectivo } from '../domain/model/periodo-lectivo.model';
import { Materia } from '../domain/model/materia.model';
import { RepoResource } from '@shared/type/repo-resource';
import { toRepoResource } from '@shared/util/repo-resource.util';

@Injectable()
export class PeriodoLectivoApiService implements PeriodoLectivoRepository {
  
  private readonly injector = inject(Injector);
  private readonly http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/periodos-lectivos';

  findAll(pageRequest: PageRequest): Observable<PaginatedResponse<PeriodoLectivo>> {
    return this.http.get<PaginatedResponse<PeriodoLectivo>>(this.baseUrl, {params: this.buildParams(pageRequest)});
  }

  findMateriasByPeriodoDocente(idPeriodo: Signal<number | undefined>, idDocente: Signal<number | undefined>): RepoResource<Materia[]> {
    const httpRes: HttpResourceRef<Materia[]> = httpResource(() => {
      const idPer = idPeriodo();
      const idDoc = idDocente();
      if(idPer == null || idDoc == null) return undefined;
      return `${this.baseUrl}/${idPer}/docentes/${idDoc}/materias`;
    }, { defaultValue: [], injector: this.injector });
    return toRepoResource(httpRes);
  }

  private buildParams(pageRequest: PageRequest): HttpParams {
    let params = new HttpParams()
      .append('page', pageRequest.page)
      .append('size', pageRequest.size);
    if(pageRequest.sort)params = params.appendAll({
      'sort': pageRequest.sort.orders.map(o => `${o.direction == 'asc' ? '+':'-'}${o.field}`)
    })
    return params;
  }

  findById(id: Signal<number | undefined>): RepoResource<PeriodoLectivo | undefined> {
    const httpRes: HttpResourceRef<PeriodoLectivo | undefined> = httpResource(() => {
      const idPer = id();
      if(idPer == null) return undefined;
      return `${this.baseUrl}/${idPer}`;
    }, { defaultValue: undefined, injector: this.injector });
    return toRepoResource(httpRes);
  }
}
