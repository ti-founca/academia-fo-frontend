import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFiltroGeneral } from './form-filtro-general';

describe('FormFiltroGeneral', () => {
  let component: FormFiltroGeneral;
  let fixture: ComponentFixture<FormFiltroGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFiltroGeneral],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFiltroGeneral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
