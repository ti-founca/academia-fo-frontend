import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEvdocDocente } from './reporte-evdoc-docente';

describe('ReporteEvdocDocente', () => {
  let component: ReporteEvdocDocente;
  let fixture: ComponentFixture<ReporteEvdocDocente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteEvdocDocente],
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteEvdocDocente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
