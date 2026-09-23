import { Component, model } from '@angular/core';
import componentConfig from './component.config';
import { EstamentoFacade } from '@features/evaluacion-docente/reportes/application/facade/estamento.facade';

const VISTAS = ["General", "Por Indicador"] as const;
type VistaType = typeof VISTAS[number];
interface Anho{
  anho: number,
  nombre: string;
}

@Component({
  selector: 'acadfo-evaluacion-por-indicador',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './evaluacion-por-indicador.html',
  styleUrl: './evaluacion-por-indicador.less',
})
export class EvaluacionPorIndicador {
readonly anhos: Anho[] = [
    { anho: 1, nombre: "1er año" },
    { anho: 2, nombre: "2do año" },
    { anho: 3, nombre: "3er año" },
    { anho: 4, nombre: "4to año" },
    { anho: 5, nombre: "5to año" }
  ]
  readonly vistas = [...VISTAS]; 
  readonly vistaActiva = model<VistaType>("Por Indicador");

  constructor(
    public estamentoFacade: EstamentoFacade
  ){}

  cambiarVista(e: string | number){
    /*if(e == 'Por Indicador')
      this.router.navigate(['..', 'por-indicador'], {relativeTo: this.aroute});
    else
      this.router.navigate(['..', 'general'], { relativeTo: this.aroute });*/
  }
}
