import { Observable } from "rxjs";

export abstract class EvaluacionGeneralDocenteExporter {
    abstract getReporteByIdPeriodo(idPeriodo: number): Observable<Blob>;
}