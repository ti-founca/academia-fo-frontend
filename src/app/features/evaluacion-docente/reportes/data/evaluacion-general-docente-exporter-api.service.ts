import { Observable } from "rxjs";
import { EvaluacionGeneralDocenteExporter } from "../application/port/evaluacion-general-docente-exporter.port";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EvaluacionGeneralDocenteExporterApiService implements EvaluacionGeneralDocenteExporter {
    private readonly baseUrl = 'http://localhost:8080/api/evaluaciones/reportes/general/exportar';

    constructor(private http: HttpClient){}

    getReporteByIdPeriodo(idPeriodo: number): Observable<Blob> {
        return this.http.get(this.baseUrl,
            {
                responseType: 'blob',
                params: { idPeriodo }
            }
        );
    }

}