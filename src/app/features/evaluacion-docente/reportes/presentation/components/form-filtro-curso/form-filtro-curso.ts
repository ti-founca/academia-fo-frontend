import { Component, effect, input, OnInit, output } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'acadfo-evdoc-form-filtro-curso',
  imports: [
    NzSelectModule,
    NzGridModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-filtro-curso.html',
  styleUrl: './form-filtro-curso.less',
})
export class FormFiltroCurso implements OnInit {
  readonly idTipoDocente = input<number | undefined>();
  readonly tipoDocenteCtrl = new FormControl<number | null>(null);
  readonly tipoDocenteChange = outputFromObservable(this.tipoDocenteCtrl.valueChanges);
  readonly tipoDocenteChangeSig = toSignal(this.tipoDocenteCtrl.valueChanges);
  readonly cantidadFiltros = output<number>();

  constructor(){
    effect(() => {
      let cantidad = 0;
      if(this.tipoDocenteChangeSig() != null) cantidad++;
      return this.cantidadFiltros.emit(cantidad);
    })
  }

  ngOnInit(): void {
    this.tipoDocenteCtrl.setValue(this.idTipoDocente() ?? null, { emitEvent: false })
  }
}
