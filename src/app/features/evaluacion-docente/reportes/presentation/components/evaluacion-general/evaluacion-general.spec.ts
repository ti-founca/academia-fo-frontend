import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  EvaluacionGeneral } from './evaluacion-general';

describe('ReportesEvaluacionDocenteHome', () => {
  let component: EvaluacionGeneral;
  let fixture: ComponentFixture<EvaluacionGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionGeneral],
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionGeneral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
