import { Component, effect, inject, input, model, signal, untracked, viewChild } from '@angular/core';
import componentConfig from './component.config';
import { EvaluacionGeneral } from '../../components/evaluacion-general/evaluacion-general';
import { EvaluacionPorIndicador } from '../../components/evaluacion-por-indicador/evaluacion-por-indicador';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { PeriodoLectivoFacade } from '@features/evaluacion-docente/reportes/application/facade/periodo-lectivo.facade';
import { ActivatedRoute, Router } from '@angular/router';

const VISTAS = ["General", "Por Indicador"] as const;
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

  readonly evGeneralView = viewChild(EvaluacionGeneral);
  readonly evPorIndicadorView = viewChild(EvaluacionPorIndicador);
  readonly emptyFilterFormVw = viewChild('emptyFilterForm');
  readonly vistas = [...VISTAS]; 
  readonly vistaActiva = model<VistaType>("General");
  readonly cantidadFiltros = signal<number>(0);
  readonly panelFiltrosVisible = signal(false);

  readonly periodoLectivoCtrl = new FormControl<number | null>(null);
  readonly idPeriodoLectivo = toSignal(this.periodoLectivoCtrl.valueChanges, { initialValue: null });

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
    if(this.vistaActiva() == 'General'){
      if(this.evGeneralView()?.exportarDisabled() ?? true)
        this.notif.warning('Reporte sin datos','');
      else
        this.evGeneralView()?.exportarEvaluacionGeneral();
    }else if(this.vistaActiva() == 'Por Indicador'){
      this.notif.info('Exportar', 'Por Indicador');
    }else {
      this.notif.error('Error al exportar', 'El modo debe ser «General» o «Por Indicador»');
    }
  }

  abrirFiltros(){
    this.panelFiltrosVisible.set(true);
  }

  cerrarFiltros(){
    this.panelFiltrosVisible.set(false);
  }

  /*setIdPeriodoLectivoGral(id: number | null){
    this.evGeneralView()?.setIdPeriodoLectivo(id);
  }*/

  setCantidadFiltros(cantidad: number){
    this.cantidadFiltros.set(cantidad);
  }
}