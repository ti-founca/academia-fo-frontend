import { Component, computed, effect, ElementRef, Signal, signal, viewChild } from '@angular/core';
import { EvaluacionGeneralDocenteFacade } from '../../../application/facade/evaluacion-general-docente.facade';
import { DetalleEvaluacionGeneralDocente } from '../../../domain/model/detalle-evaluacion-general-docente.model';
import { PeriodoLectivoFacade } from '../../../application/facade/periodo-lectivo.facade';
import componentConfig from './component.config';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { EvaluacionGeneralDocenteExporterFacade } from '@features/evaluacion-docente/reportes/application/facade/evaluacion-general-docente-exporter.facade';

@Component({
  selector: 'acadfo-evaluacion-general',
    templateUrl: './evaluacion-general.html',
    styleUrl: './evaluacion-general.less',
    imports: componentConfig.imports,
    providers: componentConfig.providers
})
export class EvaluacionGeneral {
  public readonly filtrosGeneralVw = viewChild<ElementRef>('filtrosGeneral');
  readonly expandSetSignal = signal(new Set<string>());
  public readonly exportarDisabled: Signal<boolean> = computed(() => {
    if(this.evaluacionGeneralFacade.evaluacionGeneralDocenteList == null) return true;
    return this.evaluacionGeneralFacade.evaluacionGeneralDocenteList().length == 0;
  })

  readonly visible = signal(false);

  constructor(
    public evaluacionGeneralFacade: EvaluacionGeneralDocenteFacade,
    public evaluacionGeneralExporterFacade: EvaluacionGeneralDocenteExporterFacade
  ) {
    /*effect(() => {
      this.evaluacionGeneralFacade.idPeriodo.set(this.idPeriodoLectivoSel());
    })
    effect(() => {
      this.filtrosGeneralVw.
    })*/
  }

  addExpand(id: string) {
    this.expandSetSignal.update((set) => {
      const nuevoSet = new Set(set);
      nuevoSet.add(id);
      return nuevoSet;
    });
  }

  removeExpand(id: string) {
    this.expandSetSignal.update((set) => {
      const nuevoSet = new Set(set);
      nuevoSet.delete(id);
      return nuevoSet;
    });
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) this.addExpand(id);
    else this.removeExpand(id);
  }

  isExpanded(id: string) {
    return computed(() => this.expandSetSignal().has(id));
  }

  findDetallesEvaluacion(id: string): Signal<DetalleEvaluacionGeneralDocente[]>{
    return computed(() => this.evaluacionGeneralFacade.evaluacionGeneralDocenteList().find(ev => ev.uuid == id)?.detalle ?? []);
  }

  public exportarEvaluacionGeneral(){
    this.evaluacionGeneralExporterFacade.exportar(this.evaluacionGeneralFacade.idPeriodo() ?? -1);
  }

  abrirFiltros(){
    this.visible.set(true);
  }

  cerrarFiltros(){
    this.visible.set(false);
  }

  setIdPeriodoLectivo(id: number | null){
    console.log("Set id periodo lectivo seleccionado evaluacion general :" + id)
    this.evaluacionGeneralFacade.idPeriodo.set(id);
  }
}
