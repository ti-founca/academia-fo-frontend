import { Observable } from "rxjs";
import { ReporteEvaluacionGeneralQuery } from "../application/port/reporte-evaluacion-general.port";
import { inject, Injectable, Injector, Signal } from "@angular/core";
import { HttpClient, httpResource } from "@angular/common/http";
import { EvaluacionDocente } from "../application/read-model/evaluacion-docente.model";
import { RepoResource } from "@shared/type/repo-resource";
import { toRepoResource } from "@shared/util/repo-resource.util";
import { EvaluacionDocenteMateria } from "../application/read-model/evaluacion-docente-materia.model";

@Injectable()
export class ReporteEvaluacionGeneralApiService implements ReporteEvaluacionGeneralQuery {
    private readonly http = inject(HttpClient);
    private readonly injector = inject(Injector);
    
    private readonly apiUrl = 'http://localhost:8080/api/evaluaciones/reportes/general';
    private readonly baseUrl = 'http://localhost:8080/api/evaluaciones/reportes/general/exportar';
    private readonly periodosApiUrl = 'http://localhost:8080/api/periodos-lectivos';
    
    getByIdPeriodo(idPeriodo: Signal<number | undefined>): RepoResource<EvaluacionDocente[]> {
        const resource = httpResource<EvaluacionDocente[]>(()=>{
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

    exportarExcelPorCurso(idPeriodo: number, idTipoDocente?: number): Observable<Blob> {
        const params: Record<string, number> = {};
        if(idTipoDocente != null) params['idTipoDocente'] = idTipoDocente;
        return this.http.get(`${this.periodosApiUrl}/${idPeriodo}/reportes/docentes-materias/exportar`,
            { responseType: 'blob', params }
        );
    }

    exportarPdfDocente(idPeriodo: number, idDocente: number): Observable<Blob> {
        return this.http.get(`${this.periodosApiUrl}/${idPeriodo}/reportes/docentes/${idDocente}/pdf`,
            { responseType: 'blob' }
        );
    }

    getByIdPeriodoIdDocente(idPeriodo: Signal<number | undefined>, idDocente: Signal<number | undefined>): RepoResource<EvaluacionDocente | undefined> {
        const resource = httpResource<EvaluacionDocente | undefined>(() => {
            const idPer = idPeriodo();
            const idDoc = idDocente();
            if(idPer == null || idDoc == null) return undefined;
            return `${this.periodosApiUrl}/${idPer}/reportes/docentes/${idDoc}`;
        }, {defaultValue: undefined, injector: this.injector });
        return toRepoResource(resource);
    }

    getReporteDocenteMateriaByIdPeriodo(idPeriodo: Signal<number | undefined>): RepoResource<EvaluacionDocenteMateria[]> {
        const httpRes = httpResource<EvaluacionDocenteMateria[]>(() => {
            const idPer = idPeriodo();
            if(idPer == null) return undefined;
            return `${this.periodosApiUrl}/${idPer}/reportes/docentes-materias`;
        }, {
            defaultValue: [],
            injector: this.injector
        })
        return toRepoResource(httpRes);
    }

}