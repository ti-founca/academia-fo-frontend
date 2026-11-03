import { Observable } from "rxjs";
import { EvaluacionDocente } from "../read-model/evaluacion-docente.model";
import { RepoResource } from "@shared/type/repo-resource";
import { Signal } from "@angular/core";
import { EvaluacionDocenteMateria } from "../read-model/evaluacion-docente-materia.model";
import { SinEvaluacion } from "../read-model/sin-evaluacion.model";

export abstract class ReporteEvaluacionGeneralQuery {
    abstract getByIdPeriodo(idPeriodo: Signal<number | undefined>): RepoResource<EvaluacionDocente[]>;
    abstract getSinEvaluacionByIdPeriodo(idPeriodo: Signal<number | undefined>, idEstamento: Signal<number | undefined>): RepoResource<SinEvaluacion[]>;
    abstract getByIdPeriodoIdDocente(idPeriodo: Signal<number | undefined>, idDocente: Signal<number | undefined>): RepoResource<EvaluacionDocente | undefined>;
    abstract getReporteDocenteMateriaByIdPeriodo(idPeriodo: Signal<number | undefined>): RepoResource<EvaluacionDocenteMateria[]>;
    abstract exportarExcel(idPeriodo: number, idEstamentoSinEvaluacion?: number): Observable<Blob>;
    abstract exportarExcelPorCurso(idPeriodo: number, idTipoDocente?: number): Observable<Blob>;
    abstract exportarPdfDocente(idPeriodo: number, idDocente: number): Observable<Blob>;
}