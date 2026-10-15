import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionPorEstamento } from './evaluacion-por-estamento';

describe('EvaluacionPorEstamento', () => {
  let component: EvaluacionPorEstamento;
  let fixture: ComponentFixture<EvaluacionPorEstamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionPorEstamento],
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionPorEstamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
