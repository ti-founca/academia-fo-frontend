import { EvaluacionGeneralDocenteRepository } from '../domain/repository/evaluacion-general-docente.repository';
import { map, Observable } from 'rxjs';
import { EvaluacionGeneralDocente } from '../domain/model/evaluacion-general-docente.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EvaluacionGeneralDocenteApiService implements EvaluacionGeneralDocenteRepository{
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/evaluaciones/reportes/general';

  getByIdPeriodo(idPeriodo: number): Observable<EvaluacionGeneralDocente[]> {
    return this.http.get<EvaluacionGeneralDocente[]>(`${this.baseUrl}?idPeriodo=${idPeriodo}`)
      .pipe(
        map((evaluaciones) =>
          evaluaciones.map(e => {
            return {
              ...e,
              uuid: crypto.randomUUID(),
              detalle: e.detalle.map(d => ({...d, uuid: crypto.randomUUID()}))
            }
          })
        )
      );
  }

}
