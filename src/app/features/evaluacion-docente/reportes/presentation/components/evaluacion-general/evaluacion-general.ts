import { Component, computed, ElementRef, inject, input, Signal, signal, viewChild } from '@angular/core';
import { EvaluacionGeneralDocenteFacade } from '../../../application/facade/evaluacion-general-docente.facade';
import componentConfig from './component.config';
import { EvaluacionGeneralDocente } from '@features/evaluacion-docente/reportes/application/read-model/evaluacion-general-docente.model';

@Component({
  selector: 'acadfo-evaluacion-general',
    templateUrl: './evaluacion-general.html',
    styleUrl: './evaluacion-general.less',
    imports: componentConfig.imports,
    providers: componentConfig.providers
})
export class EvaluacionGeneral {
  public readonly filtrosGeneralVw = viewChild<ElementRef>('filtrosGeneral');
  private readonly evaluacionGeneralDocenteFacade = inject(EvaluacionGeneralDocenteFacade);
  
  readonly visible = signal(false);
  readonly expandSetSignal = signal(new Set<number>());
  readonly idPeriodoLectivo = input<number | null>();
  readonly evaluacionGeneralResource = this.evaluacionGeneralDocenteFacade.getByIdPeriodo(computed(() => this.idPeriodoLectivo() ?? undefined));

  readonly evaluacionGeneralList = computed(() => this.evaluacionGeneralResource.value() ?? []);
  readonly exportarDisabled: Signal<boolean> = computed(() => this.evaluacionGeneralList().length === 0);

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

  public exportarEvaluacionGeneral(){
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

  sortCodigoDocenteFn = (a: EvaluacionGeneralDocente, b: EvaluacionGeneralDocente): number => a.idDocente - b.idDocente;
  sortNombresFn = (a: EvaluacionGeneralDocente, b: EvaluacionGeneralDocente): number => a.nombres.localeCompare(b.nombres);
  sortApellidosFn = (a: EvaluacionGeneralDocente, b: EvaluacionGeneralDocente): number => a.apellidos.localeCompare(b.apellidos);
}
