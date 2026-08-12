import { Observable } from 'rxjs';
import { PeriodoLectivo } from '../model/periodo-lectivo.model';
import { PaginatedResponse } from '@shared/pagination/paginated-response.model';
import { PageRequest } from '@shared/pagination/page-request.model';

export abstract class PeriodoLectivoRepository {
  abstract findAll(pageRequest: PageRequest): Observable<PaginatedResponse<PeriodoLectivo>>;
}
