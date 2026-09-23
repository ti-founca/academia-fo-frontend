import { PageRequest } from "@shared/pagination/page-request.model";
import { PaginatedResponse } from "@shared/pagination/paginated-response.model";
import { Observable } from "rxjs";
import { Estamento } from "../model/estamento.model";

export abstract class EstamentoRepository {
    abstract findAll(pageRequest: PageRequest): Observable<PaginatedResponse<Estamento>>;
}