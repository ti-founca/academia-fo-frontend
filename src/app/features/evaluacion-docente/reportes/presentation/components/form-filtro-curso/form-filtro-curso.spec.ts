import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFiltroCurso } from './form-filtro-curso';

describe('FormFiltroCurso', () => {
  let component: FormFiltroCurso;
  let fixture: ComponentFixture<FormFiltroCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFiltroCurso],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFiltroCurso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
