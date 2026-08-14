import { Component, computed, effect, Signal, signal } from '@angular/core';
import { EvaluacionGeneralDocenteFacade } from '../../../application/facade/evaluacion-general-docente.facade';
import { DetalleEvaluacionGeneralDocente } from '../../../domain/model/detalle-evaluacion-general-docente.model';
import { PeriodoLectivoFacade } from '../../../application/facade/periodo-lectivo.facade';
import componentConfig from './component.config';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { EvaluacionGeneralDocenteExporterFacade } from '@features/evaluacion-docente/reportes/application/facade/evaluacion-general-docente-exporter.facade';

@Component({
  selector: 'app-reportes-evaluacion-docente-home',
    templateUrl: './reportes-evaluacion-docente-home.html',
    styleUrl: './reportes-evaluacion-docente-home.less',
    imports: componentConfig.imports,
    providers: componentConfig.providers
})
export class ReportesEvaluacionDocenteHome {
  expandSetSignal = signal(new Set<string>());
  periodoLectivoCtrl = new FormControl<number | null>(null);
  idPeriodoLectivoSel = toSignal(this.periodoLectivoCtrl.valueChanges, { initialValue: null });
  exportarDisabled: Signal<boolean> = computed(() => {
    if(this.evaluacionGeneralFacade.evaluacionGeneralDocenteList == null) return true;
    return this.evaluacionGeneralFacade.evaluacionGeneralDocenteList().length == 0;
  })

  constructor(
    public evaluacionGeneralFacade: EvaluacionGeneralDocenteFacade,
    public periodoLectivoFacade: PeriodoLectivoFacade,
    public evaluacionGeneralExporterFacade: EvaluacionGeneralDocenteExporterFacade
  ) {
    effect(() => {
      this.evaluacionGeneralFacade.idPeriodo.set(this.idPeriodoLectivoSel());
    })
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

  exportarEvaluacionGeneral(){
    this.evaluacionGeneralExporterFacade.exportar(this.idPeriodoLectivoSel() ?? -1);
  }
}
