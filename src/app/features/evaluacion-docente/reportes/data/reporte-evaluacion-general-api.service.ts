import { Observable } from "rxjs";
import { ReporteEvaluacionGeneralQuery } from "../application/port/reporte-evaluacion-general.port";
import { inject, Injectable, Injector, Signal } from "@angular/core";
import { HttpClient, httpResource } from "@angular/common/http";
import { EvaluacionGeneralDocente } from "../application/read-model/evaluacion-general-docente.model";
import { RepoResource } from "@shared/type/repo-resource";
import { toRepoResource } from "@shared/util/repo-resource.util";

@Injectable()
export class ReporteEvaluacionGeneralApiService implements ReporteEvaluacionGeneralQuery {
    
    private readonly http = inject(HttpClient);
    private readonly injector = inject(Injector);
    
    private readonly apiUrl = 'http://localhost:8080/api/evaluaciones/reportes/general';
    private readonly baseUrl = 'http://localhost:8080/api/evaluaciones/reportes/general/exportar';
    private readonly periodosApiUrl = 'http://localhost:8080/api/periodos-lectivos';
    
    getByIdPeriodo(idPeriodo: Signal<number | undefined>): RepoResource<EvaluacionGeneralDocente[]> {
        const resource = httpResource<EvaluacionGeneralDocente[]>(()=>{
            const idPer = idPeriodo();
            if(idPer == null) return undefined;
            return `${this.periodosApiUrl}/${idPer}/reportes/docentes`;
        }, {defaultValue: [], injector: this.injector });
        return toRepoResource(resource);
    }

    exportarExcel(idPeriodo: number): Observable<Blob> {
        return this.http.get(this.baseUrl,
            {
                responseType: 'blob',
                params: { idPeriodo }
            }
        );
    }

    exportarPdfDocente(idPeriodo: number, idDocente: number): Observable<Blob> {
        return this.http.get(`${this.periodosApiUrl}/${idPeriodo}/reportes/docentes/${idDocente}/pdf`,
            { responseType: 'blob' }
        );
    }

    getByIdPeriodoIdDocente(idPeriodo: Signal<number | undefined>, idDocente: Signal<number | undefined>): RepoResource<EvaluacionGeneralDocente | undefined> {
        const resource = httpResource<EvaluacionGeneralDocente | undefined>(() => {
            const idPer = idPeriodo();
            const idDoc = idDocente();
            if(idPer == null || idDoc == null) return undefined;
            return `${this.periodosApiUrl}/${idPer}/reportes/docentes/${idDoc}`;
        }, {defaultValue: undefined, injector: this.injector });
        return toRepoResource(resource);
    }

}