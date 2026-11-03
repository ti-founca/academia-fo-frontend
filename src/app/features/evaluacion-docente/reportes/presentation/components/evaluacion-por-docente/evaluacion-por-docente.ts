import { Component, computed, ElementRef, inject, input, Signal, signal, viewChild } from '@angular/core';
import { EvaluacionGeneralDocenteFacade } from '../../../application/facade/evaluacion-general-docente.facade';
import componentConfig from './component.config';
import { EvaluacionDocente } from '@features/evaluacion-docente/reportes/application/read-model/evaluacion-docente.model';

@Component({
  selector: 'acadfo-evaluacion-por-docente',
    templateUrl: './evaluacion-por-docente.html',
    styleUrl: './evaluacion-por-docente.less',
    imports: componentConfig.imports,
    providers: componentConfig.providers
})
export class EvaluacionPorDocente {
  public readonly filtrosGeneralVw = viewChild<ElementRef>('filtrosGeneral');
  private readonly evaluacionGeneralDocenteFacade = inject(EvaluacionGeneralDocenteFacade);
  
  readonly visible = signal(false);
  readonly expandSetSignal = signal(new Set<number>());
  readonly idPeriodoLectivo = input<number | null>();
  readonly idEstamentoSinEvaluacion = input<number | undefined>();
  private readonly idPeriodo = computed(() => this.idPeriodoLectivo() ?? undefined);
  readonly evaluacionGeneralResource = this.evaluacionGeneralDocenteFacade.getByIdPeriodo(this.idPeriodo);
  private readonly sinEvaluacionResource = this.evaluacionGeneralDocenteFacade.getSinEvaluacionByIdPeriodo(this.idPeriodo, this.idEstamentoSinEvaluacion);

  readonly isLoading = computed(() => this.evaluacionGeneralResource.isLoading() || this.sinEvaluacionResource.isLoading());

  // Claves "idDocente-idMateria-idTipoDocente" sin evaluaciones en el estamento seleccionado
  private readonly materiasSinEvaluacion = computed(() => new Set(
    (this.sinEvaluacionResource.value() ?? []).map(se => this.clave(se.idDocente, se.idMateria, se.idTipoDocente))
  ));

  // Con el filtro activo quedan las materias sin evaluaciones del estamento
  // y solo los docentes que conservan alguna materia
  readonly evaluacionGeneralList = computed<EvaluacionDocente[]>(() => {
    const docentes = this.evaluacionGeneralResource.value() ?? [];
    if (this.idEstamentoSinEvaluacion() == null) return docentes;
    const claves = this.materiasSinEvaluacion();
    return docentes
      .map(docente => ({
        ...docente,
        puntajes: docente.puntajes.filter(p => claves.has(this.clave(docente.idDocente, p.materia.id, p.tipoDocente.id)))
      }))
      .filter(docente => docente.puntajes.length > 0);
  });
  // La exportación todavía no aplica el filtro, por eso se habilita según el reporte completo
  readonly exportarDisabled: Signal<boolean> = computed(() => (this.evaluacionGeneralResource.value() ?? []).length === 0);

  addExpand(id: number) {
    this.expandSetSignal.update((set) => {
      const nuevoSet = new Set(set);
      nuevoSet.add(id);
      return nuevoSet;
    });
  }

  removeExpand(id: number) {
    this.expandSetSignal.update((set) => {
      const nuevoSet = new Set(set);
      nuevoSet.delete(id);
      return nuevoSet;
    });
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) this.addExpand(id);
    else this.removeExpand(id);
  }

  isExpanded(id: number) {
    return computed(() => this.expandSetSignal().has(id));
  }

  /*findDetallesEvaluacion(id: string): Signal<DetalleEvaluacionGeneralDocente[]>{
    return computed(() => this.evaluacionGeneralFacade.evaluacionGeneralDocenteList().find(ev => ev.uuid == id)?.detalle ?? []);
  }*/

  public exportarEvaluacionPorDocente(){
    this.evaluacionGeneralDocenteFacade.exportar(this.idPeriodoLectivo() ?? -1);
  }

  abrirFiltros(){
    this.visible.set(true);
  }

  cerrarFiltros(){
    this.visible.set(false);
  }

  /*setIdPeriodoLectivo(id: number | null){
    this.idPeriodo.set(id);
  }*/

  private clave(idDocente: number, idMateria: number, idTipoDocente: number): string {
    return `${idDocente}-${idMateria}-${idTipoDocente}`;
  }

  sortCodigoDocenteFn =(a: EvaluacionDocente, b: EvaluacionDocente): number => a.idDocente - b.idDocente;
  sortNombresFn = (a: EvaluacionDocente, b: EvaluacionDocente): number => a.nombres.localeCompare(b.nombres);
  sortApellidosFn = (a: EvaluacionDocente, b: EvaluacionDocente): number => a.apellidos.localeCompare(b.apellidos);
}
