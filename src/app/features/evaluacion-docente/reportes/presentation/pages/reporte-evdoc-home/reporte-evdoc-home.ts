import { Component, computed, effect, inject, input, model, signal, untracked, viewChild } from '@angular/core';
import componentConfig from './component.config';
import { EvaluacionPorDocente } from '../../components/evaluacion-por-docente/evaluacion-por-docente';
import { EvaluacionPorCurso } from '../../components/evaluacion-por-curso/evaluacion-por-curso';
import { EvaluacionPorEstamento } from '../../components/evaluacion-por-estamento/evaluacion-por-estamento';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { PeriodoLectivoFacade } from '@features/evaluacion-docente/reportes/application/facade/periodo-lectivo.facade';
import { ActivatedRoute, Router } from '@angular/router';

const VISTAS = ["Por Docente", "Por Curso", "Por Estamento"] as const;
type VistaType = typeof VISTAS[number];

@Component({
  selector: 'acadfo-evdoc-reporte-home',
  templateUrl: './reporte-evdoc-home.html',
  styleUrl: './reporte-evdoc-home.less',
  imports: componentConfig.imports,
  providers: componentConfig.providers
})
export class ReporteEvdocHome {
  public readonly periodoLectivoFacade: PeriodoLectivoFacade = inject(PeriodoLectivoFacade);
  private readonly notif: NzNotificationService = inject(NzNotificationService);
  private readonly router = inject(Router);
  private readonly aroute = inject(ActivatedRoute);

  readonly evPorDocenteView = viewChild(EvaluacionPorDocente);
  readonly evPorCursoView = viewChild(EvaluacionPorCurso);
  readonly evPorEstamentoView = viewChild(EvaluacionPorEstamento);
  readonly emptyFilterFormVw = viewChild('emptyFilterForm');
  readonly vistas = [...VISTAS]; 
  readonly vistaActiva = model<VistaType>("Por Docente");
  readonly panelFiltrosVisible = signal(false);

  readonly periodoLectivoCtrl = new FormControl<number | null>(null);
  readonly idPeriodoLectivo = toSignal(this.periodoLectivoCtrl.valueChanges, { initialValue: null });
  readonly idTipoDocenteFiltro = signal<number | undefined>(undefined);
  readonly cantidadFiltros = computed(() => {
    switch (this.vistaActiva()) {
      case 'Por Curso':
      case 'Por Estamento': return this.idTipoDocenteFiltro() != null ? 1 : 0;
      default: return 0;
    }
  });

  constructor(){
    const idPeriodoParam = this.aroute.snapshot.paramMap.get('idPeriodo');
    if(idPeriodoParam != null && !isNaN(Number(idPeriodoParam))){
      this.periodoLectivoCtrl.setValue(Number(idPeriodoParam));
    }else{
      this.periodoLectivoCtrl.setValue(null);
    }
    effect(() => {
      const idPeriodoSeleccionado = this.idPeriodoLectivo();
      if(idPeriodoSeleccionado != null){
        this.router.navigate([idPeriodoSeleccionado], { relativeTo: this.aroute.parent });
      }else{
        this.router.navigate(['.'], { relativeTo: this.aroute.parent });
      }
    })
    /*effect(() => {
      console.log('ID Periodo Param: ' + this.idPeriodoParam());
    })*/
  }

  exportarReporte(){
    if(this.vistaActiva() == 'Por Docente'){
      if(this.evPorDocenteView()?.exportarDisabled() ?? true)
        this.notif.warning('Reporte sin datos','');
      else
        this.evPorDocenteView()?.exportarEvaluacionPorDocente();
    }else if(this.vistaActiva() == 'Por Curso'){
      if(this.evPorCursoView()?.exportarDisabled() ?? true)
        this.notif.warning('Reporte sin datos','');
      else
        this.evPorCursoView()?.exportarEvaluacionPorCurso();
    }else if(this.vistaActiva() == 'Por Estamento'){
      if(this.evPorEstamentoView()?.exportarDisabled() ?? true)
        this.notif.warning('Reporte sin datos','');
      else
        this.evPorEstamentoView()?.exportarEvaluacionPorEstamento();
    }else {
      this.notif.error('Error al exportar', 'El modo debe ser «Por Docente», «Por Curso» o «Por Estamento»');
    }
  }

  abrirFiltros(){
    this.panelFiltrosVisible.set(true);
  }

  cerrarFiltros(){
    this.panelFiltrosVisible.set(false);
  }

  /*setIdPeriodoLectivoPorDocente(id: number | null){
    this.evPorDocenteView()?.setIdPeriodoLectivo(id);
  }*/
}