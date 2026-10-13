import { Observable } from 'rxjs';
import { Signal } from '@angular/core';
import { PeriodoLectivo } from '../model/periodo-lectivo.model';
import { Materia } from '../model/materia.model';
import { PaginatedResponse } from '@shared/pagination/paginated-response.model';
import { PageRequest } from '@shared/pagination/page-request.model';
import { RepoResource } from '@shared/type/repo-resource';

export abstract class PeriodoLectivoRepository {
  abstract findAll(pageRequest: PageRequest): Observable<PaginatedResponse<PeriodoLectivo>>;
  abstract findById(id: Signal<number | undefined>): RepoResource<PeriodoLectivo | undefined>;
  abstract findMateriasByPeriodoDocente(idPeriodo: Signal<number | undefined>, idDocente: Signal<number | undefined>): RepoResource<Materia[]>;
}
