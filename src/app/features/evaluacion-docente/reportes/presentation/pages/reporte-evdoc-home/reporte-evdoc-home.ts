import { Component, computed, ElementRef, model, Signal, signal, viewChild, ViewChild } from '@angular/core';
import componentConfig from './component.config';
import { EvaluacionGeneral } from '../../components/evaluacion-general/evaluacion-general';
import { EvaluacionPorIndicador } from '../../components/evaluacion-por-indicador/evaluacion-por-indicador';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
  readonly evGeneralView = viewChild(EvaluacionGeneral);
  readonly evPorIndicadorView = viewChild(EvaluacionPorIndicador);
  readonly emptyFilterFormVw = viewChild('emptyFilterForm');
  readonly vistas = [...VISTAS]; 
  readonly vistaActiva = model<VistaType>("General");
  readonly cantidadFiltros = signal<number>(0);
  readonly panelFiltrosVisible = signal(false);

  constructor(
    private notif: NzNotificationService
  ){}

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

  setIdPeriodoLectivoGral(id: number | null){
    this.evGeneralView()?.setIdPeriodoLectivo(id);
  }

  setCantidadFiltros(cantidad: number){
    this.cantidadFiltros.set(cantidad);
  }
}