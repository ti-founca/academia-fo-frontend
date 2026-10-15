import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PeriodoLectivoFacade } from '@features/evaluacion-docente/reportes/application/facade/periodo-lectivo.facade';
import componentConfig from './component.config';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'acadfo-evdoc-form-filtro-docente',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './form-filtro-docente.html',
  styleUrl: './form-filtro-docente.less',
})
export class FormFiltroDocente {
  readonly periodoLectivoCtrl = new FormControl<number | null>(null);
  readonly idPeriodoLectivo = outputFromObservable(this.periodoLectivoCtrl.valueChanges)

  constructor(
    public periodoLectivoFacade: PeriodoLectivoFacade,
  ){ }
}
