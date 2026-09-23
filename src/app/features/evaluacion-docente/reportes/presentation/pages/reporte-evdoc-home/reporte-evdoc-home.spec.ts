import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEvdocHome } from './reporte-evdoc-home';

describe('EvaluacionPorIndicador', () => {
  let component: ReporteEvdocHome;
  let fixture: ComponentFixture<ReporteEvdocHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteEvdocHome],
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteEvdocHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
