import { Observable } from "rxjs";
import { EvaluacionGeneralDocente } from "../read-model/evaluacion-general-docente.model";
import { RepoResource } from "@shared/type/repo-resource";
import { Signal } from "@angular/core";

export abstract class ReporteEvaluacionGeneralQuery {
    abstract getByIdPeriodo(idPeriodo: Signal<number | undefined>): RepoResource<EvaluacionGeneralDocente[]>;
    abstract getByIdPeriodoIdDocente(idPeriodo: Signal<number | undefined>, idDocente: Signal<number | undefined>): RepoResource<EvaluacionGeneralDocente | undefined>;
    abstract exportarExcel(idPeriodo: number): Observable<Blob>;
    abstract exportarPdfDocente(idPeriodo: number, idDocente: number): Observable<Blob>;
}