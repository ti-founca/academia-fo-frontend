import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionPorIndicador } from './evaluacion-por-indicador';

describe('EvaluacionPorIndicador', () => {
  let component: EvaluacionPorIndicador;
  let fixture: ComponentFixture<EvaluacionPorIndicador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionPorIndicador],
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionPorIndicador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
