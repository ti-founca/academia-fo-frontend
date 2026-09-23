import { Component, computed } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PeriodoLectivoFacade } from '@features/evaluacion-docente/reportes/application/facade/periodo-lectivo.facade';
import componentConfig from './component.config';
import { outputFromObservable, toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'acadfo-evdoc-form-filtro-general',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './form-filtro-general.html',
  styleUrl: './form-filtro-general.less',
})
export class FormFiltroGeneral {
  readonly periodoLectivoCtrl = new FormControl<number | null>(null);
  readonly idPeriodoLectivo = outputFromObservable(this.periodoLectivoCtrl.valueChanges)
  readonly idPeriodoLectivoSig = toSignal(this.periodoLectivoCtrl.valueChanges, { initialValue: null });
  readonly cantidadFiltrosSig = computed(() => {
    let cantidad: number = 0;
    if (this.idPeriodoLectivoSig() != null) cantidad++;
    return cantidad;
  })
  readonly cantidadFiltros = outputFromObservable(toObservable(this.cantidadFiltrosSig));

  constructor(
    public periodoLectivoFacade: PeriodoLectivoFacade,
  ){ }
}
