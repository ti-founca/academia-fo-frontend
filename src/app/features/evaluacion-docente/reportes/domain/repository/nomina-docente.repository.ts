import { Docente } from "../model/docente.model";
import { Signal } from "@angular/core";
import { RepoResource } from "@shared/type/repo-resource";
import { NominaDocente } from "../model/nomina-docente.model";

export abstract class NominaDocenteRepository{
    abstract findDocenteByNominaDocente(idNomina: Signal<number | undefined>, idDocente: Signal<number | undefined>): RepoResource<Docente | undefined>;
    abstract findByPeriodoId(idPeriodo: Signal<number | undefined>): RepoResource<NominaDocente[]>;
}