import { Component, computed, Signal, signal } from '@angular/core';
import { EvaluacionGeneralDocenteRepository } from '../../../domain/repository/evaluacion-general-docente.repository';
import { EvaluacionGeneralDocenteApiService } from '../../../data/evaluacion-general-docente-api.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EvaluacionGeneralDocenteFacade } from '../../../application/evaluacion-general-docente.facade';
import { DetalleEvaluacionGeneralDocente } from '../../../domain/model/detalle-evaluacion-general-docente.model';

@Component({
  selector: 'app-reportes-evaluacion-docente-home',
  imports: [NzTableModule],
  templateUrl: './reportes-evaluacion-docente-home.html',
  styleUrl: './reportes-evaluacion-docente-home.less',
  providers: [
    EvaluacionGeneralDocenteFacade,
    { provide: EvaluacionGeneralDocenteRepository, useClass: EvaluacionGeneralDocenteApiService },
  ],
})
export class ReportesEvaluacionDocenteHome {
  expandSetSignal = signal(new Set<string>());

  constructor(public facade: EvaluacionGeneralDocenteFacade) {
    facade.idPeriodo.set(20);
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
    return computed(() => this.facade.evaluacionGeneralDocenteList().find(ev => ev.uuid == id)?.detalle ?? []);
  }
}
