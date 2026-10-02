import { DetalleEvaluacionGeneralDocente } from './detalle-evaluacion-general-docente.model';

export interface EvaluacionGeneralDocente{
  idDocente: number
  nombres: string;
  apellidos: string;
  ci: string;
  puntajes: DetalleEvaluacionGeneralDocente[];
}
