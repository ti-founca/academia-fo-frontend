import { API_BASE_URL } from "@core/config/api.config";
import { inject, Injectable, Injector, Signal } from "@angular/core";
import { HttpClient, httpResource } from "@angular/common/http";
import { Observable } from "rxjs";
import { RepoResource } from "@shared/type/repo-resource";
import { toRepoResource } from "@shared/util/repo-resource.util";
import { ReporteIndicadorQuery } from "../application/port/reporte-indicador.port";
import { PuntajePorIndicador } from "../application/read-model/puntaje-por-indicador.model";

@Injectable()
export class ReporteIndicadorApiService implements ReporteIndicadorQuery {
    private readonly http = inject(HttpClient);
    private readonly injector = inject(Injector);

    private readonly apiUrl = `${API_BASE_URL}/evaluaciones/reportes/indicador`;
    private readonly exportarUrl = `${API_BASE_URL}/evaluaciones/reportes/indicador/exportar`;

    getByIdPeriodo(idPeriodo: Signal<number | undefined>, idTipoDocente: Signal<number | undefined>): RepoResource<PuntajePorIndicador[]> {
        const resource = httpResource<PuntajePorIndicador[]>(() => {
            const idPer = idPeriodo();
            const idTipoDoc = idTipoDocente();
            if(idPer == null) return undefined;
            const params: Record<string, number> = { idPeriodo: idPer };
            if(idTipoDoc != null) params['idTipoDocente'] = idTipoDoc;
            return { url: this.apiUrl, params };
        }, { defaultValue: [], injector: this.injector });
        return toRepoResource(resource);
    }

    exportarExcel(idPeriodo: number, idTipoDocente?: number): Observable<Blob> {
        const params: Record<string, number> = { idPeriodo };
        if(idTipoDocente != null) params['idTipoDocente'] = idTipoDocente;
        return this.http.get(this.exportarUrl, { responseType: 'blob', params });
    }
}
