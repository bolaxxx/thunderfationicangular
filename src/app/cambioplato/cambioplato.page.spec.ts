import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioplatoPage } from './cambioplato.page';

describe('CambioplatoPage', () => {
  let component: CambioplatoPage;
  let fixture: ComponentFixture<CambioplatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioplatoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioplatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
