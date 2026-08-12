import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodoLectivoRepository } from '../domain/repository/periodo-lectivo.repository';
import { PageRequest } from '@shared/pagination/page-request.model';
import { PaginatedResponse } from '@shared/pagination/paginated-response.model';
import { Observable } from 'rxjs';
import { PeriodoLectivo } from '../domain/model/periodo-lectivo.model';

@Injectable()
export class PeriodoLectivoApiService implements PeriodoLectivoRepository {
  private baseUrl = 'http://localhost:8080/api/periodos-lectivos';

  constructor(private http: HttpClient) {}

  findAll(pageRequest: PageRequest): Observable<PaginatedResponse<PeriodoLectivo>> {
    return this.http.get<PaginatedResponse<PeriodoLectivo>>(this.baseUrl, {params: this.buildParams(pageRequest)});
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
}
