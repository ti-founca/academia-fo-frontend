import { EvaluacionGeneralDocente } from '../model/evaluacion-general-docente.model';
import { Observable } from 'rxjs';

export abstract class EvaluacionGeneralDocenteRepository{
  abstract getByIdPeriodo(idPeriodo: number): Observable<EvaluacionGeneralDocente[]>;
}
