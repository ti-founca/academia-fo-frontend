import { Injectable } from "@angular/core";
import { EstamentoRepository } from "../domain/repository/estamento.repository";
import { PageRequest } from "@shared/pagination/page-request.model";
import { PaginatedResponse } from "@shared/pagination/paginated-response.model";
import { Observable } from "rxjs";
import { Estamento } from "../domain/model/estamento.model";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class EstamentoApiService implements EstamentoRepository {
    private baseUrl = 'http://localhost:8080/api/estamentos';

    constructor(private http: HttpClient){}

    findAll(pageRequest: PageRequest): Observable<PaginatedResponse<Estamento>> {
        return this.http.get<PaginatedResponse<Estamento>>(this.baseUrl, { params: this.buildParams(pageRequest) })
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