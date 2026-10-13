import { Signal } from "@angular/core";
import { RepoResource } from "@shared/type/repo-resource";
import { Docente } from "../model/docente.model";

export abstract class DocenteRepository{
    abstract findById(idDocente: Signal<number | undefined>): RepoResource<Docente | undefined>;
}