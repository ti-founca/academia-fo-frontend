import { Docente } from "../../domain/model/docente.model";
import { Materia } from "../../domain/model/materia.model";
import { TipoDocente } from "../../domain/model/tipo-docente.model";

export interface EvaluacionDocenteMateria {
    docente: Docente;
    tipoDocente: TipoDocente;
    materia: Materia;
    puntajeGeneral: string;
}

