import { TipoDocente } from "../../domain/model/tipo-docente.model";
import { Estamento } from "./estamento.model";
import { Indicador } from "./indicador.model";

export interface PuntajePorIndicador {
    estamento: Estamento;
    tipoDocente: TipoDocente;
    indicador: Indicador;
    promedio: number;
    cantidad: number;
}
