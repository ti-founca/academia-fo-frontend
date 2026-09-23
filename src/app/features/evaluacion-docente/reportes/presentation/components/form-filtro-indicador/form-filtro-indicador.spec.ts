import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFiltroIndicador } from './form-filtro-indicador';

describe('FormFiltroIndicador', () => {
  let component: FormFiltroIndicador;
  let fixture: ComponentFixture<FormFiltroIndicador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFiltroIndicador],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFiltroIndicador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
