import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesEvaluacionDocenteHome } from './reportes-evaluacion-docente-home';

describe('ReportesEvaluacionDocenteHome', () => {
  let component: ReportesEvaluacionDocenteHome;
  let fixture: ComponentFixture<ReportesEvaluacionDocenteHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesEvaluacionDocenteHome],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportesEvaluacionDocenteHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
