import { Curso } from "./curso.model";

export interface Materia{
    id: number;
    codigo: string;
    descripcion: string;
    curso: Curso;
}