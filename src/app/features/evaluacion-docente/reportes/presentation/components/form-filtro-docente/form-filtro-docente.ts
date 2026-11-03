import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EstamentoFacade } from '@features/evaluacion-docente/reportes/application/facade/estamento.facade';
import componentConfig from './component.config';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'acadfo-evdoc-form-filtro-docente',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './form-filtro-docente.html',
  styleUrl: './form-filtro-docente.less',
})
export class FormFiltroDocente implements OnInit {
  readonly estamentoFacade = inject(EstamentoFacade);

  readonly idEstamento = input<number | undefined>();
  readonly estamentoCtrl = new FormControl<number | null>(null);
  readonly idEstamentoChange = outputFromObservable(this.estamentoCtrl.valueChanges);

  constructor(){
    this.estamentoFacade.sort.set({ orders: [{ field: "id", direction: "asc" }] });
    this.estamentoFacade.pageSize.set(50);
  }

  ngOnInit(): void {
    // El drawer recrea el formulario al abrirse: se restaura la selección vigente
    this.estamentoCtrl.setValue(this.idEstamento() ?? null, { emitEvent: false });
  }
}
