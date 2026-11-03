import { Component, computed, ElementRef, inject, input, Signal, signal, viewChild } from '@angular/core';
import { EvaluacionGeneralDocenteFacade } from '../../../application/facade/evaluacion-general-docente.facade';
import componentConfig from './component.config';
import { EvaluacionDocente, PuntajeMateria } from '@features/evaluacion-docente/reportes/application/read-model/evaluacion-docente.model';
import { Estamento } from '@features/evaluacion-docente/reportes/application/read-model/estamento.model';

interface PuntajeMateriaFiltrado extends PuntajeMateria {
  estamentosSinEvaluacion: Estamento[];
}

interface EvaluacionDocenteFiltrado extends EvaluacionDocente {
  puntajes: PuntajeMateriaFiltrado[];
}

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
  readonly idsEstamentoSinEvaluacion = input<number[]>([]);
  private readonly idPeriodo = computed(() => this.idPeriodoLectivo() ?? undefined);
  readonly evaluacionGeneralResource = this.evaluacionGeneralDocenteFacade.getByIdPeriodo(this.idPeriodo);
  private readonly sinEvaluacionResource = this.evaluacionGeneralDocenteFacade.getSinEvaluacionByIdPeriodo(this.idPeriodo, this.idsEstamentoSinEvaluacion);

  readonly filtroSinEvaluacionActivo = computed(() => this.idsEstamentoSinEvaluacion().length > 0);
  readonly isLoading = computed(() => this.evaluacionGeneralResource.isLoading() || this.sinEvaluacionResource.isLoading());

  // "idDocente-idMateria-idTipoDocente" → estamentos seleccionados en los que no tiene evaluaciones
  private readonly estamentosSinEvaluacionPorMateria = computed(() => {
    const mapa = new Map<string, Estamento[]>();
    for (const se of this.sinEvaluacionResource.value() ?? []) {
      const clave = this.clave(se.idDocente, se.idMateria, se.idTipoDocente);
      const estamentos = mapa.get(clave) ?? [];
      estamentos.push(se.estamento);
      mapa.set(clave, estamentos);
    }
    for (const estamentos of mapa.values()) estamentos.sort((a, b) => a.id - b.id);
    return mapa;
  });

  // Con el filtro activo quedan las materias a las que les falta al menos uno de los estamentos
  // seleccionados, y solo los docentes que conservan alguna materia
  readonly evaluacionGeneralList = computed<EvaluacionDocenteFiltrado[]>(() => {
    const docentes = this.evaluacionGeneralResource.value() ?? [];
    if (!this.filtroSinEvaluacionActivo()) {
      return docentes.map(docente => ({
        ...docente,
        puntajes: docente.puntajes.map(p => ({ ...p, estamentosSinEvaluacion: [] }))
      }));
    }
    const mapa = this.estamentosSinEvaluacionPorMateria();
    return docentes
      .map(docente => ({
        ...docente,
        puntajes: docente.puntajes
          .map(p => ({ ...p, estamentosSinEvaluacion: mapa.get(this.clave(docente.idDocente, p.materia.id, p.tipoDocente.id)) ?? [] }))
          .filter(p => p.estamentosSinEvaluacion.length > 0)
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
