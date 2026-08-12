import { Component, computed, effect, Signal, signal } from '@angular/core';
import { EvaluacionGeneralDocenteFacade } from '../../../application/evaluacion-general-docente.facade';
import { DetalleEvaluacionGeneralDocente } from '../../../domain/model/detalle-evaluacion-general-docente.model';
import { PeriodoLectivoFacade } from '../../../application/periodo-lectivo.facade';
import componentConfig from './component.config';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

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

  constructor(
    public evaluacionGeneralFacade: EvaluacionGeneralDocenteFacade,
    public periodoLectivoFacade: PeriodoLectivoFacade
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
}
