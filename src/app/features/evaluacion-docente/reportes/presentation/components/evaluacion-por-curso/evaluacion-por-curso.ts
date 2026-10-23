import { Component, computed, inject, input } from '@angular/core';
import componentConfig from './component.config';
import { EvaluacionGeneralDocenteFacade } from '@features/evaluacion-docente/reportes/application/facade/evaluacion-general-docente.facade';
import { EvaluacionDocenteMateria } from '@features/evaluacion-docente/reportes/application/read-model/evaluacion-docente-materia.model';
import { TipoDocente } from '@features/evaluacion-docente/reportes/domain/model/tipo-docente.model';

interface Anho {
  anho: number,
  nombre: string;
}

interface GrupoTipoDocente {
  tipoDocente: TipoDocente;
  evaluaciones: EvaluacionDocenteMateria[];
}

@Component({
  selector: 'acadfo-evaluacion-por-curso',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './evaluacion-por-curso.html',
  styleUrl: './evaluacion-por-curso.less',
})
export class EvaluacionPorCurso {
  readonly evaluacionGeneralDocenteFacade = inject(EvaluacionGeneralDocenteFacade);

  readonly idPeriodo = input<number | undefined>();
  readonly idTipoDocente = input<number | undefined>();
  private readonly evaluacionDocenteMateriaResource = this.evaluacionGeneralDocenteFacade.getReporteDocenteMateriaByIdPeriodo(this.idPeriodo);
  readonly evaluacionesDocentesMaterias = computed<EvaluacionDocenteMateria[]>(() => {
    const idTipoDoc = this.idTipoDocente();
    const evaluaciones = this.evaluacionDocenteMateriaResource.value();
    if(evaluaciones == null) return [];
    return evaluaciones.filter(ed => idTipoDoc != null ? ed.tipoDocente.id == idTipoDoc : true)
  });
  // anho del curso → evaluaciones agrupadas por tipo de docente.
  readonly reportePorCurso = computed<Map<number, GrupoTipoDocente[]>>(() => {
    const porAnho = new Map<number, Map<number, GrupoTipoDocente>>();
    for (const ed of this.evaluacionesDocentesMaterias()) {
      const porTipoDocente = porAnho.get(ed.materia.curso.anho) ?? new Map();
      porAnho.set(ed.materia.curso.anho, porTipoDocente);
      const grupo = porTipoDocente.get(ed.tipoDocente.id) ?? { tipoDocente: ed.tipoDocente, evaluaciones: [] };
      porTipoDocente.set(ed.tipoDocente.id, grupo);
      grupo.evaluaciones.push(ed);
    }

    const resultado = new Map<number, GrupoTipoDocente[]>();
    for (const [anho, porTipoDocente] of porAnho) {
      resultado.set(anho, [...porTipoDocente.values()].sort((a, b) => a.tipoDocente.id - b.tipoDocente.id));
    }
    return resultado;
  });
  readonly isEvaluacionesLoading = computed(() => this.evaluacionDocenteMateriaResource.isLoading());
  readonly exportarDisabled = computed(() => this.evaluacionesDocentesMaterias().length === 0);

  readonly anhos: Anho[] = [
    { anho: 1, nombre: "1er año" },
    { anho: 2, nombre: "2do año" },
    { anho: 3, nombre: "3er año" },
    { anho: 4, nombre: "4to año" },
    { anho: 5, nombre: "5to año" }
  ]

  exportarEvaluacionPorCurso(){
    const idPeriodo = this.idPeriodo();
    if(idPeriodo == null) return;
    this.evaluacionGeneralDocenteFacade.exportarPorCurso(idPeriodo, this.idTipoDocente());
  }
}
