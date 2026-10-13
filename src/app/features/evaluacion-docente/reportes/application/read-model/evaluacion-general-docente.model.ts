import { Indicador } from './indicador.model';
import { Materia } from '../../domain/model/materia.model';
import { TipoDocente } from '../../domain/model/tipo-docente.model';
import { Estamento } from './estamento.model';

export interface EvaluacionGeneralDocente{
  idDocente: number
  nombres: string;
  apellidos: string;
  ci: string;
  puntajes: PuntajeMateriaDocente[];
}

export interface PuntajeMateriaDocente {
  uuid: string;
  materia: Materia;
  tipoDocente: TipoDocente;
  puntajeGeneral: number;
  puntajePorEstamento: PuntajeEstamento[];
}

export interface PuntajeEstamento {
    estamento: Estamento;
    puntaje: string;
    puntajePonderado: string;
    puntajePorIndicador: PuntajeIndicador[];
}

export interface PuntajeIndicador{
  indicador: Indicador;
  puntaje: string;
  cantidad: number;
}
