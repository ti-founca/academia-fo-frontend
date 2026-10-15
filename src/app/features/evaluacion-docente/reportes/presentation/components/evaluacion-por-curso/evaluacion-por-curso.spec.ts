import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionPorCurso } from './evaluacion-por-curso';

describe('EvaluacionPorCurso', () => {
  let component: EvaluacionPorCurso;
  let fixture: ComponentFixture<EvaluacionPorCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionPorCurso],
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionPorCurso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
