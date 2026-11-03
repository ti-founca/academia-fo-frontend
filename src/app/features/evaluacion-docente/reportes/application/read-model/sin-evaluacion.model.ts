import { Estamento } from "./estamento.model";

export interface SinEvaluacion {
    idDocente: number;
    idMateria: number;
    idTipoDocente: number;
    estamento: Estamento;
}
