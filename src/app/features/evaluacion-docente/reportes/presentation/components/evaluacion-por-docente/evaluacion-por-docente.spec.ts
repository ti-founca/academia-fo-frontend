import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  EvaluacionPorDocente } from './evaluacion-por-docente';

describe('ReportesEvaluacionDocenteHome', () => {
  let component: EvaluacionPorDocente;
  let fixture: ComponentFixture<EvaluacionPorDocente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionPorDocente],
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionPorDocente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
