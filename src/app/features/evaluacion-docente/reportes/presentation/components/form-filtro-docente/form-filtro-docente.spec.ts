import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFiltroDocente } from './form-filtro-docente';

describe('FormFiltroDocente', () => {
  let component: FormFiltroDocente;
  let fixture: ComponentFixture<FormFiltroDocente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFiltroDocente],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFiltroDocente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
