import { Component, computed, inject, model, Signal, signal } from '@angular/core';
import componentConfig from './component.config';
import { Docente } from '@features/evaluacion-docente/reportes/domain/model/docente.model';
import { NominaDocenteFacade } from '@features/evaluacion-docente/reportes/application/facade/nomina-docente.facade';
import { ActivatedRoute } from '@angular/router';

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
  private readonly emptyDocente: Docente = {id: 123, nombres: "Juan Antonio", apellidos: "Perez Gonzalez", ci: "5004083"}
  //Injections
  readonly nominaDocenteFacade = inject(NominaDocenteFacade);
  readonly idPeriodo = signal<number | undefined>(undefined);
  readonly idDocente = signal<number | undefined>(undefined);
  //Injections
  
  private readonly nominasResource = this.nominaDocenteFacade.getNominasResourceByPeriodoId(this.idPeriodo);
  readonly idNomina = computed<number | undefined>(() => {
    const nomina = this.nominasResource.value();
    if(nomina == null || nomina.length == 0) return undefined;
    return nomina[0].id;
  })
  private readonly aroute: ActivatedRoute = inject(ActivatedRoute);
  

  readonly vistas = [...VISTAS]; 
  readonly vistaActiva = model<VistaType>("General");
  readonly cantidadFiltros = signal<number>(0);
  private readonly docenteResource = this.nominaDocenteFacade.getDocenteResource(this.idNomina, this.idDocente);
  readonly docente: Signal<Docente | undefined> = computed(() => this.docenteResource.value());
  
  readonly isCINumeric: Signal<boolean> = computed(() => {
    const doc = this.docente();
    if(doc == null) return false;
    return Number.isInteger(Number(doc.ci))
  });
  

  constructor(){
    const idPeriodoPar = Number(this.aroute.snapshot.paramMap.get('idPeriodo'));
    if(Number.isInteger(idPeriodoPar)) this.idPeriodo.set(idPeriodoPar);
    const idDocentePar = Number(this.aroute.snapshot.paramMap.get('idDocente'));
    if(Number.isInteger(idDocentePar)) this.idDocente.set(idDocentePar);
  }
}
