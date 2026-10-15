import { Component, computed, effect, inject, model, Signal, signal } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import componentConfig from './component.config';
import { Docente } from '@features/evaluacion-docente/reportes/domain/model/docente.model';
import { NominaDocenteFacade } from '@features/evaluacion-docente/reportes/application/facade/nomina-docente.facade';
import { ActivatedRoute } from '@angular/router';
import { DocenteFacade } from '@features/evaluacion-docente/reportes/application/facade/docente.facade';
import { EvaluacionGeneralDocenteFacade } from '@features/evaluacion-docente/reportes/application/facade/evaluacion-general-docente.facade';
import { EvaluacionDocente, PuntajeMateria } from '@features/evaluacion-docente/reportes/application/read-model/evaluacion-docente.model';
import { PeriodoLectivoFacade } from '@features/evaluacion-docente/reportes/application/facade/periodo-lectivo.facade';

const VISTAS = ["General", "Por Indicador"] as const;
type VistaType = typeof VISTAS[number];

@Component({
  selector: 'acadfo-evdoc-reporte-docente',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './reporte-evdoc-docente.html',
  styleUrl: './reporte-evdoc-docente.less',
})
export class ReporteEvdocDocente {
  //Injections
  readonly nominaDocenteFacade = inject(NominaDocenteFacade);
  readonly docenteFacade = inject(DocenteFacade);
  readonly periodoLectivoFacade = inject(PeriodoLectivoFacade);
  readonly evaluacionGeneralDocenteFacade = inject(EvaluacionGeneralDocenteFacade);

  readonly idPeriodo = signal<number | undefined>(undefined);
  readonly idDocente = signal<number | undefined>(undefined);
  
  private readonly aroute: ActivatedRoute = inject(ActivatedRoute);
  private readonly notif: NzNotificationService = inject(NzNotificationService);
  
  readonly vistas = [...VISTAS]; 
  readonly vistaActiva = model<VistaType>("General");
  readonly cantidadFiltros = signal<number>(0);
  readonly docenteResource = this.docenteFacade.getDocenteResource(this.idDocente);
  readonly evaluacionDocenteResource = this.evaluacionGeneralDocenteFacade.getByIdPeriodoIdDocente(this.idPeriodo, this.idDocente);
  readonly periodoLectivoResource = this.periodoLectivoFacade.findByIdResource(this.idPeriodo);

  readonly evaluacionDocente = computed<EvaluacionDocente | undefined>(() => this.evaluacionDocenteResource.value());
  readonly docente: Signal<Docente | undefined> = computed(() => this.docenteResource.value());
  readonly detalleEvaluacionDocente = computed<PuntajeMateria[]>(() => {
    const evaluacion = this.evaluacionDocente();
    if(evaluacion == null) return [];
    return evaluacion.puntajes;
  });
  
  readonly isCINumeric: Signal<boolean> = computed(() => {
    const doc = this.docente();
    if(doc == null) return false;
    return Number.isInteger(Number(doc.ci))
  });

  readonly exportando = this.evaluacionGeneralDocenteFacade.loading;
  readonly exportarDisabled: Signal<boolean> = computed(() => this.detalleEvaluacionDocente().length === 0);

  readonly expandSetSignal = signal(new Set<string>());

  constructor(){
    const idPeriodoPar = Number(this.aroute.snapshot.paramMap.get('idPeriodo'));
    if(Number.isInteger(idPeriodoPar)) this.idPeriodo.set(idPeriodoPar);
    const idDocentePar = Number(this.aroute.snapshot.paramMap.get('idDocente'));
    if(Number.isInteger(idDocentePar)) this.idDocente.set(idDocentePar);

    effect(() => {
      const error = this.evaluacionGeneralDocenteFacade.error();
      if(error != null) this.notif.error('Error al exportar', error);
    });
  }

  exportar() {
    const idPer = this.idPeriodo();
    const idDoc = this.idDocente();
    if(idPer == null || idDoc == null || this.exportarDisabled()) return;
    const doc = this.docente();
    const nombre = doc == null ? `${idDoc}` : `${doc.apellidos}_${doc.nombres}`;
    this.evaluacionGeneralDocenteFacade.exportarPdfDocente(idPer, idDoc, `PuntajeDocente_${nombre}.pdf`.replace(/\s+/g, '_'));
  }

  addExpand(id: string) {
    this.expandSetSignal.update((set)=>{
      const nuevoSet = new Set(set);
      nuevoSet.add(id);
      return nuevoSet;
    })
  }

  removeExpand(id: string) {
    this.expandSetSignal.update((set)=>{
      const nuevoSet = new Set(set);
      nuevoSet.delete(id);
      return nuevoSet;
    })
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) this.addExpand(id);
    else this.removeExpand(id);
  }

  isExpanded(id: string) {
    return computed(() => this.expandSetSignal().has(id));
  }
}
