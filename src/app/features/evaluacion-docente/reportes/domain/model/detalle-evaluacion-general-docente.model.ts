import { Materia } from "./materia.model";
import { TipoDocente } from "./tipo-docente.model";

export interface DetalleEvaluacionGeneralDocente {
  uuid: string;
  materia: Materia;
  tipoDocente: TipoDocente;
  promedioGeneral: number;
}
