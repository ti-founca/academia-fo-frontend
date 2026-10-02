import { DetalleEvaluacionGeneralDocente } from './detalle-evaluacion-general-docente.model';

export interface EvaluacionGeneralDocente{
  uuid: string;
  codigoMateria: string;
  docente: string;
  materia: string;
  promedioGeneral: number;
  tipoDocente: string;
  detalle: DetalleEvaluacionGeneralDocente[];
}
