import { Signal } from "@angular/core";
import { Observable } from "rxjs";
import { RepoResource } from "@shared/type/repo-resource";
import { PuntajePorIndicador } from "../read-model/puntaje-por-indicador.model";

export abstract class ReporteIndicadorQuery {
    abstract getByIdPeriodo(idPeriodo: Signal<number | undefined>, idTipoDocente: Signal<number | undefined>): RepoResource<PuntajePorIndicador[]>;
    abstract exportarExcel(idPeriodo: number, idTipoDocente?: number): Observable<Blob>;
}
